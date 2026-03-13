import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // CHANGE: Destructure 'name' instead of 'fullName'
    const { name, email, password } = body;

    // 1. Validation: Use 'name' here
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, Email, and Password are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create User: Map 'name' to your schema's 'firstName'
    await User.create({
      firstName: name,
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      { success: true, message: "Account created!" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
