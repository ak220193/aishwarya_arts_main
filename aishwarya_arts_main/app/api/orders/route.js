import { connectDB } from "../../../lib/db";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Counter from "../../../models/CounterApi"; // IMPORT COUNTER
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    const orders = await Order.find({ user: dbUser._id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    const body = await req.json();
    const { orderItems, shippingAddress, paymentMethod, razorpayOrderId, razorpayPaymentId } = body;

    // --- 1. GENERATE CUSTOM ORDER ID (AG-DDMM-XXX) ---
    const now = new Date();
    const monthYearStr = `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    
    const counter = await Counter.findOneAndUpdate(
      { dateStr: monthYearStr },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const customOrderId = `AG-${String(counter.seq).padStart(3, '0')}-${monthYearStr}`;
    

    // --- 2. VALIDATE ITEMS & PRICE ---
    let subtotal = 0;
    const verifiedItems = [];
    for (const item of orderItems) {
      const dbProduct = await Product.findById(item.product || item.id);
      if (!dbProduct) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
      
      const itemPrice = dbProduct.offerPrice || dbProduct.price;
      subtotal += itemPrice * item.quantity;
      verifiedItems.push({
        product: dbProduct._id,
        title: dbProduct.title,
        image: dbProduct.images[0],
        price: itemPrice,
        quantity: item.quantity,
        size: item.size,
        frame: item.frame,
      });
    }

    const gstAmount = Math.round(subtotal * 0.05);
    const shippingCost = subtotal > 50000 ? 0 : 650;
    const finalTotal = subtotal + gstAmount + shippingCost;

    // --- 3. CREATE ORDER ---
    const newOrder = await Order.create({
      orderId: customOrderId, // USE CUSTOM ID
      user: dbUser._id, 
      orderItems: verifiedItems,
      totalAmount: finalTotal,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "Razorpay" ? "Paid" : "Pending",
      razorpayOrderId: razorpayOrderId || null,
      razorpayPaymentId: razorpayPaymentId || null,
      paidAt: paymentMethod === "Razorpay" ? new Date() : null,
      orderStatus: "Processing",
    });

    return NextResponse.json({ success: true, message: "Order successful", orderId: customOrderId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}