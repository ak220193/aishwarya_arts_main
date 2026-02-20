import { connectDB } from "../../../lib/db";
import User from "../../../lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    // Create test user
    const hashed = await bcrypt.hash("password123", 10);

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashed,
    });

    return Response.json({
      success: true,
      message: "MongoDB connected & test user created",
      user,
    });

  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
