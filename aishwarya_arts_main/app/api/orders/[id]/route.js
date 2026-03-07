import { connectDB } from "../../../../lib/db";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";

// 1. Receive 'params' from the dynamic route [id]
export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    // Extract the ID from the URL
    const { id } = params;

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const userId = session.user.id || session.user._id;

    // 2. Change .find() to .findOne() 
    // 3. Match BOTH the Order ID and the User ID for security
    const order = await Order.findOne({ 
      _id: id, 
      user: userId 
    }).populate("orderItems.product", "title images price");

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found or access denied" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: order 
    }, { status: 200 });

  } catch (error) {
    console.error("GET_SINGLE_ORDER_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" }, 
      { status: 500 }
    );
  }
}