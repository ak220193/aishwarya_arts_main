import { NextResponse } from "next/server";
import cloudinary from "@/lib/auth/cloudinary"; // adjust path to your lib folder

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer for processing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with "Fast-Load" settings
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "aishwarya_arts_products", // Organized folder
          resource_type: "auto",
          transformation: [
            { quality: "auto", fetch_format: "auto" } // THE SPEED FIX: Auto-compress & WebP
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Return the secure URL to the frontend
    return NextResponse.json({ url: uploadResponse.secure_url });
    
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}