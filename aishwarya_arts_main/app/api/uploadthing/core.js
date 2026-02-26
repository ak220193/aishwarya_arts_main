import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Configured for your Tanjore paintings (Up to 4MB per image)
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => {
      // This confirms your .env is "Live" in your VS Code Terminal
      console.log("UT Secret Check:", process.env.UPLOADTHING_SECRET ? "✅ DETECTED" : "❌ MISSING");
      return { status: "authorized" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for status:", metadata.status);
      console.log("File saved at:", file.url);
      
      // ENGINEER'S TIP: Ensure we return the url as part of an object 
      // so your frontend 'res' array contains exactly what you expect.
      return { url: file.url };
    }),
};