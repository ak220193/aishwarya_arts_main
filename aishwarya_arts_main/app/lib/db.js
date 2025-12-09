import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing in .env file");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "aishwarya_arts", // You can change DB name anytime
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Could not connect to database");
  }
};
