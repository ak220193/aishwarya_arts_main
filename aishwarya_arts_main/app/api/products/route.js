import { connectDB } from "../../lib/db";
import Product from "../../lib/models/Product";

// GET method — fetch all products
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get("collection"); // e.g., "modern-tanjore"

    let filter = {};
    if (collection) filter.collection = collection;

    const products = await Product.find(filter).lean();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to Fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
// POST method — add new product
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newProduct = await Product.create(body);

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
