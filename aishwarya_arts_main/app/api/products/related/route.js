import { connectDB } from "../../../lib/db";
import Product from "../../../lib/models/Product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const exclude = searchParams.get("exclude");

    if (!category) {
      return new Response(
        JSON.stringify({ message: "Category required" }),
        { status: 400 }
      );
    }

    const products = await Product.find({
      category,
      slug: { $ne: exclude },
    })
      .limit(3)
      .lean();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}
