import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();

    // In Next.js 15, params is a Promise that must be awaited
    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Masterpiece not found in vault" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: product 
    }, { status: 200 });

  } catch (error) {
    console.error("DYNAMIC FETCH ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Database signal failed" },
      { status: 500 }
    );
  }
}