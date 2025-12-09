import { connectDB } from "../../../lib/db";
import User from "../../../lib/models/User";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Email already in use" }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({ name, email, password: hashedPassword });

    return new Response(
      JSON.stringify({ success: true, message: "User created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
