import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import { getServerSession } from "next-auth";
// FIX: Import from lib/auth instead of the route file
import { authOptions } from "../../../../lib/auth"; 
import { NextResponse } from "next/server";

// 1. GET: Fetch user data to display in the profile form
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select("-password");
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 2. PUT: Update user data from the profile form
export async function PUT(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, alternatePhone, address, avatar } = body;

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { 
          firstName, 
          lastName, 
          alternatePhone, 
          address,
          avatar 
        } 
      },
      { new: true }
    ).select("-password");

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully", 
      data: updatedUser 
    }, { status: 200 });

  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}