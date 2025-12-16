import { connectDB } from "../../../lib/db";
import Product from "../../../lib/models/Product";

export async function GET(req, { params }) {
  // Await params if Next.js requires it
  const { slug } = await params;

  await connectDB();

  try {
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
