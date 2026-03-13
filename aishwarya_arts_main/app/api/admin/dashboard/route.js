import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // 1. Calculate Revenue (Total of all 'Paid' orders)
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // 2. Count Active Logistics (Shipped or Processing)
    const activeOrders = await Order.countDocuments({ 
      orderStatus: { $in: ["Processing", "Shipped"] } 
    });

    // 3. Count Total Patrons
    const totalPatrons = await User.countDocuments({ role: "user" });

    // 4. Inventory Alerts (Products with stock < 5)
    const lowStock = await Product.find({ stock: { $lt: 5 } }).limit(5);

    // 5. Recent Sales for the Chart (Last 7 days)
    const last7Days = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          paymentStatus: "Paid"
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        activeOrders,
        totalPatrons,
        artworkSold: await Order.countDocuments({ paymentStatus: "Paid" })
      },
      lowStock,
      chartData: last7Days
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}