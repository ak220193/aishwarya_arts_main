import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";

// --- GET: Fetch Single Order Details ---
export async function GET(req, { params }) {
  try {
    await connectDB();
    
   
    const { id } = await params;

    const order = await Order.findById(id).populate("user", "email");

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const responseData = {
      ...order._doc,
      email: order.user?.email || "Guest Patron"
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// --- PATCH: Update Logistics ---
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    
    // 🚩 FIX: Await params before destructuring
    const { id } = await params;
    
    const body = await req.json();
    const { status, partner, trackingId } = body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        logisticsPartner: partner,
        trackingId: trackingId,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}