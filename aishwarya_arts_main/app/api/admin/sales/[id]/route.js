import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

// 1. GET: Fetch details for the View Page
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Search by your custom orderId and bring in User info
    const order = await Order.findOne({ orderId: id }).populate(
      "user", 
      "firstName lastName email primaryPhone address"
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Map DB data to match your Frontend variable names
    const formattedOrder = {
      orderId: order.orderId,
      name: `${order.user?.firstName} ${order.user?.lastName || ""}`,
      contact: order.user?.primaryPhone || "N/A",
      email: order.user?.email || "N/A",
      location: `${order.shippingAddress?.city || order.user?.address?.city || 'N/A'}, ${order.shippingAddress?.state || order.user?.address?.state || 'TN'}`,
      artwork: order.artworkName || "Tanjore Painting",
      paymentStatus: order.paymentStatus,
      method: order.paymentMethod || "UPI",
      amount: `₹${order.totalAmount?.toLocaleString("en-IN") || '0'}`,
      date: new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. PATCH: Update Status or Details
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: id },
      { $set: body },
      { new: true }
    );

    if (!updatedOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// 3. DELETE: Remove from Ledger
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const deleted = await Order.findOneAndDelete({ orderId: id });
    if (!deleted) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}