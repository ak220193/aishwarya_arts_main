import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Base price is required"],
    },
    offerPrice: {
      type: Number, // Optional: for sales/discounts
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Lord Krishna", "Lord Shiva", "Goddess Lakshmi", "Ganesha", "Others"], 
    },
    // Tanjore Specific Details
    dimensions: {
      type: String, // e.g., "12x10 inches"
      required: true,
    },
    goldFoil: {
      type: String,
      default: "22ct Gold Leaf", // Authenticity detail
    },
    frameType: {
      type: String,
      default: "Classic Frame", // Luxury detail
    },
    images: {
      type: [String], // Array of image URLs (Cloudinary/S3)
      required: [true, "At least one image is required"],
    },
    stock: {
      type: Number,
      default: 1, // Many Tanjore paintings are unique (1 of 1)
    },
    isFeatured: {
      type: Boolean,
      default: false, // For the "Top Picks" section on your homepage
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;