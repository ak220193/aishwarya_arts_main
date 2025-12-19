import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "../../lib/db";
import User from "../../lib/models/User";

connectDB();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const userEmail = session.user.email;

  try {
    const user = await User.findOne({ email: userEmail }).populate("wishlist");
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

    return new Response(JSON.stringify({ wishlist: user.wishlist }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const userEmail = session.user.email;

  try {
    const body = await req.json();
    const { productId } = body;
    if (!productId) return new Response(JSON.stringify({ message: "Product ID required" }), { status: 400 });

    const user = await User.findOne({ email: userEmail });
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

    // prevent duplicates
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    return new Response(JSON.stringify({ wishlist: user.wishlist }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
