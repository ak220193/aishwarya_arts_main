import { connectDB } from "../../../../lib/db";
import Order from "../../../../models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Find orders where 'user' matches the logged-in user ID
    // .populate("orderItems.product") pulls the Title and Image from the Product table automatically
    const orders = await Order.find({ user: session.user.id })
      .populate("orderItems.product", "title images price") 
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}