import { connectDB } from "../../../lib/db";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { NextResponse } from "next/server";

/**
 * GET: Fetch all orders for the logged-in user
 */
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id || session.user._id;

    // Fetching orders and sorting by newest first
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 });
  }
}

/**
 * POST: Create a new order (Secure)
 */
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "You must be logged in to place an order" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      razorpayOrderId, 
      razorpayPaymentId 
    } = body;

    // Basic Validation
    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty" }, { status: 400 });
    }

    // 🛡️ SERVER-SIDE PRICE CALCULATION (Prevents Price Tampering)
    let subtotal = 0;
    const verifiedItems = [];

    for (const item of orderItems) {
      const productId = item.product || item.id;
      const dbProduct = await Product.findById(productId);

      if (!dbProduct) {
        return NextResponse.json({ success: false, message: `Product ${productId} not found` }, { status: 404 });
      }

      const itemPrice = dbProduct.offerPrice || dbProduct.price;
      subtotal += itemPrice * item.quantity;

      verifiedItems.push({
        product: dbProduct._id,
        title: dbProduct.title,
        image: dbProduct.images[0],
        price: itemPrice,
        quantity: item.quantity,
        size: item.size || "12x10 inches",
        frame: item.frame || "Teak Wood",
      });
    }

    // 💸 TAX & SHIPPING LOGIC (Must match Frontend)
    const gstAmount = Math.round(subtotal * 0.05);
    const shippingCost = subtotal > 50000 ? 0 : 650;
    const finalCalculatedTotal = subtotal + gstAmount + shippingCost;

    // 📝 CREATE ORDER
    const newOrder = await Order.create({
      user: session.user.id || session.user._id,
      orderItems: verifiedItems,
      totalAmount: finalCalculatedTotal,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        phone: shippingAddress.phone,
      },
      paymentMethod,
      // Status Logic
      paymentStatus: paymentMethod === "Razorpay" ? "Paid" : "Pending",
      razorpayOrderId: razorpayOrderId || null,
      razorpayPaymentId: razorpayPaymentId || null,
      paidAt: paymentMethod === "Razorpay" ? new Date() : null,
      orderStatus: "Processing",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        orderId: newOrder._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order Creation Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process order" },
      { status: 500 }
    );
  }
}