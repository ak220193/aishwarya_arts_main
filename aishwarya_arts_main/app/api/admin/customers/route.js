import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Order from "@/models/Order"; 
import User from "@/models/User"; // Ensure you import the User model

export async function GET() {
  try {
    await connectDB();

    const customerPatrons = await Order.aggregate([
      {
        $group: {
          _id: "$user", // Group by the User ID link
          totalValue: { $sum: "$totalAmount" }, 
          ordersCount: { $sum: 1 }, 
          lastPurchase: { $max: "$createdAt" },
          paymentStatus: { $first: "$paymentStatus" },
          // Keep shipping address details as backup
          shippingName: { $first: "$shippingAddress.fullName" },
          location: { $first: "$shippingAddress.city" }
        }
      },
      {
        // 🚩 JOIN WITH USER COLLECTION
        $lookup: {
          from: "users", // the collection name in MongoDB (usually plural)
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          totalValue: 1,
          ordersCount: 1,
          lastPurchase: 1,
          paymentStatus: 1,
          location: 1,
          // 🚩 PULL DATA FROM USER OBJECT
          name: { $ifNull: ["$userDetails.firstName", "$shippingName"] },
          lastName: "$userDetails.lastName",
          email: "$userDetails.email", // Now we have the Mail ID!
          phone: { $ifNull: ["$userDetails.primaryPhone", "$phone"] }
        }
      },
      { $sort: { totalValue: -1 } } 
    ]);

    return NextResponse.json({ success: true, data: customerPatrons });
  } catch (error) {
    console.error("Aggregation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}