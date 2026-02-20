import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Get the session (The Security Check)
    const session = await getServerSession(authOptions);

    // 2. Auth Guard: Block guests from creating orders
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "You must be logged in to place an order" },
        { status: 401 }
      );
    }

    const { orderItems, shippingAddress, totalAmount, paymentMethod } = await req.json();

    // 3. Validation: Ensure order isn't empty
    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in the order" },
        { status: 400 }
      );
    }

    // 4. Create the Order using the logged-in User's ID
    const newOrder = await Order.create({
      user: session.user.id, // Securely pulled from the token
      orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully!", 
      orderId: newOrder._id 
    }, { status: 201 });

  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order" }, 
      { status: 500 }
    );
  }
}