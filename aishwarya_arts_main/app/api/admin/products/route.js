import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product"; 

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      data: products 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch inventory signal" 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB(); 
    const body = await req.json();

    // ENGINEER'S CALIBRATION: Map the new storytelling and matrix fields
    const calibratedData = {
      ...body,
      // Default storytelling if empty
      storyTitle: body.storyTitle || "Heritage in Every Stroke",
      detailedDescription: body.detailedDescription || body.description,
      goldPurity: body.goldPurity || "Certified 22ct Gold Foil",
      materialBase: body.materialBase || "Water-resistant Plywood & Premium Cotton Cloth",
      
      // Ensure priceMatrix is at least an empty array if not provided
      priceMatrix: body.priceMatrix || [],
      
      // Cleanup God Name for consistent filtering
      godName: body.godName?.toLowerCase().trim().replace("lord ", "") || "others"
    };

    const newProduct = await Product.create(calibratedData);

    return NextResponse.json({ 
      success: true, 
      data: newProduct 
    }, { status: 201 });

  } catch (error) {
    console.error("DATABASE ERROR:", error.message);
    
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: "SKU Conflict: This unique ID already exists in the gallery vault." 
      }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}