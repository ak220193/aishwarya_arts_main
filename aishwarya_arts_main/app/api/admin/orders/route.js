import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Order from "@/models/Order";
import User from "@/models/User"; 

export async function GET() {
  try {
    await connectDB();

    // Aggregation to join Order with User for Admin Logistics view
    const allOrders = await Order.aggregate([
      {
        $lookup: {
          from: "users", 
          localField: "user",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      { $unwind: { path: "$customerDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          orderId: 1,
          totalAmount: 1,
          orderStatus: 1,
          paymentStatus: 1,
          paymentMethod: 1,
          createdAt: 1,
          shippingAddress: 1,
          email: { $ifNull: ["$customerDetails.email", "Guest Patron"] },
          customerName: "$shippingAddress.fullName"
        }
      },
      { $sort: { createdAt: -1 } } 
    ]);

    return NextResponse.json({ success: true, data: allOrders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}