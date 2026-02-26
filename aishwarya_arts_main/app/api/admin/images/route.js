import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    // This fetches all images specifically from your aishwarya_arts folder
    const results = await cloudinary.search
      .expression("folder:aishwarya_arts")
      .sort_by("created_at", "desc")
      .max_results(112)
      .execute();

    const imageUrls = results.resources.map((file) => file.secure_url);
    
    return NextResponse.json(imageUrls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}