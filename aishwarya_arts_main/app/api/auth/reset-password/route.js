// app/api/auth/reset-password/route.js
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    await connectDB();

    // 1. Hash the incoming plain token to match DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find user AND explicitly select the hidden fields
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires"); 

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or link has expired" }, 
        { status: 400 }
      );
    }

    // 3. Update password and clear reset fields
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // validateBeforeSave: false is helpful if some required fields are missing
    await user.save({ validateBeforeSave: false });

    return NextResponse.json({ success: true, message: "Password updated!" });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}