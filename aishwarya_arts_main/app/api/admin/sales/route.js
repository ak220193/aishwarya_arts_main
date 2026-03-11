import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch orders and populate user details (Patron Name, Email, Phone)
    const orders = await Order.find()
      .populate("user", "firstName lastName email primaryPhone address")
      .sort({ createdAt: -1 });

    // Map DB data to match your Frontend 'salesData' keys exactly
    const formattedSales = orders.map((order, index) => ({
      sNo: index + 1,
      name: `${order.user?.firstName} ${order.user?.lastName || ""}`,
      contact: order.user?.primaryPhone || "N/A",
      email: order.user?.email || "N/A",
      location: `${order.shippingAddress?.city || order.user?.address?.city}, ${order.shippingAddress?.state || order.user?.address?.state}`,
      orderId: order.orderId,
      artwork: order.artworkName || "Tanjore Painting",
      paymentStatus: order.paymentStatus, // 'Paid' or 'Pending'
      method: order.paymentMethod || "UPI",
      amount: `₹${order.totalAmount.toLocaleString("en-IN")}`,
      date: new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    return NextResponse.json(formattedSales);
  } catch (error) {
    console.error("SALES_FETCH_ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch ledger" }, { status: 500 });
  }
}