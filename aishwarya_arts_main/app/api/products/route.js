import { connectDB } from "../../../lib/db";
import Product from "../../../models/Product";
import { NextResponse } from "next/server";

// 1. GET ALL PRODUCTS (For your Shop/Collections page)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }); // Newest first
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 2. ADD A NEW PRODUCT (For your Admin Panel)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // PM: In a real admin panel, we'd check for 'admin' role here
    const newProduct = await Product.create(body);

    return NextResponse.json({ 
      success: true, 
      message: "Painting added to gallery!", 
      data: newProduct 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}