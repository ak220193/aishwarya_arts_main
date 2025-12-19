// /api/wishlist/[productId].js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "../../../lib/db";
import User from "../../../lib/models/User";

connectDB();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const userEmail = session.user.email;
  const { productId } = req.query;

  try {
    const user = await User.findOne({ email: userEmail }).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.method === "GET") {
      return res.status(200).json({ wishlist: user.wishlist });
    }

    if (req.method === "POST") {
      if (!productId) return res.status(400).json({ message: "Product ID is required" });

      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
      } else {
        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      }

      await user.save();
      await user.populate("wishlist");

      return res.status(200).json({ wishlist: user.wishlist });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
