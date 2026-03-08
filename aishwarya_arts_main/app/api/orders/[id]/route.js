import { connectDB } from "../../../../lib/db";
import Order from "../../../../models/Order";
import User from "../../../../models/User"; // Import User model
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const { id } = await params; // This is the Order ID from the URL

    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 1. GET THE REAL DB USER ID (Fixes the BSON Error)
    const dbUser = await User.findOne({ email: session.user.email });
    
    if (!dbUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // 2. QUERY USING dbUser._id
    const order = await Order.findOne({
      _id: id,
      user: dbUser._id // Uses the 24-char ObjectId
    }).populate("orderItems.product", "title images price");

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (error) {
    console.error("Order Detail Error:", error.message);
    return NextResponse.json({ success: false, message: "Failed to fetch order details" }, { status: 500 });
  }
}