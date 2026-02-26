import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product"; 



export async function GET() {
  try {
    await connectDB();
    
    // Fetch products and sort by newest first
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      data: products 
    }, { status: 200 });

  } catch (error) {
    console.error("GET INVENTORY ERROR:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch signals" 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB(); 
    const body = await req.json();

    // ENGINEER'S CALIBRATION: Ensure mandatory fields have values 
    // even if the UI forgets to send them.
    const calibratedData = {
      ...body,
      description: body.description || "Handcrafted 22ct Gold Leaf Tanjore Painting",
      category: body.category || "3D Tanjore Painting",
      godName: body.godName?.toLowerCase().replace("lord ", "") || "others"
    };

    const newProduct = await Product.create(calibratedData);

    return NextResponse.json({ 
      success: true, 
      data: newProduct 
    }, { status: 201 });

  } catch (error) {
    console.error("DATABASE ERROR:", error.message);
    
    // Check for duplicate SKU (Error code 11000)
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: "This SKU already exists. Please use a unique ID." 
      }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}