import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

// 1. GET: Fetch details for the View Page
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const order = await Order.findOne({ orderId: id }).populate(
      "user",
      "firstName lastName email primaryPhone address",
    );
    console.log("--- RAW DATABASE ORDER ---", JSON.stringify(order, null, 2));

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const item = order.orderItems[0];

    // --- CORRECTIONS & ADDITIONS FOR THE NEW UI ---
    const formattedOrder = {
      orderId: order.orderId,
      name:
        order.shippingAddress?.fullName ||
        `${order.user?.firstName} ${order.user?.lastName}`,
      contact: order.shippingAddress?.phone || order.user?.primaryPhone,
      email: order.user?.email || "N/A",

      // Logistics
      fullAddress: `${order.shippingAddress?.address || "N/A"}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.pincode}`,
      location: `${order.shippingAddress?.city}, ${order.shippingAddress?.state}`,

      // 🚩 IMAGE & PRODUCT FIX
      artwork: item?.title || "Tanjore Painting",
      image: item?.image || null, // This now pulls: https://utfs.io/f/...
      dimensions: item?.size || "Not Specified",
      frameType: item?.frame || "Standard Frame",

      paymentStatus: order.paymentStatus,
      method: order.paymentMethod,
      amount: `₹${order.totalAmount?.toLocaleString("en-IN")}`,
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
      { new: true },
    );

    if (!updatedOrder)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
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
    if (!deleted)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
