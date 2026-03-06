import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "SKU is mandatory"],
      unique: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    // --- DYNAMIC PRICING MATRIX ---
    // This stores the Excel-style data: [{size: "15x12", style: "flat", price: 11999}]
    priceMatrix: [
      {
        size: { type: String, required: true },
        style: { type: String, required: true },
        price: { type: Number, required: true },
        mrp: { type: Number },
      }
    ],
    // Fallback/Starting prices
    price: {
      type: Number,
      required: [true, "Base retail price is required"],
    },
    offerPrice: {
      type: Number,
    },
    
    // --- ART IDENTITY ---
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "3D Tanjore Painting",
    },
    godName: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    workStyle: {
      type: String,
      enum: ["3d", "2d", "flat", "embossed"],
      default: "3d",
    },

    // --- TECHNICAL SPECS ---
    dimensions: {
      type: String,
      default: '15" X 12"',
    },
    frameType: {
      type: String,
      default: "Genuine Teak Wood",
    },
    weight: {
      type: String,
      default: "2.5 kg",
    },
    leadTime: {
      type: String,
      default: "Ready to Ship",
    },

    // --- RICH STORYTELLING (Necessary for the new UI) ---
    storyTitle: { 
      type: String, 
      default: "Heritage in Every Stroke" 
    },
    description: {
      type: String,
      required: [true, "Short description is required"],
      default: "Handcrafted 22ct Gold Leaf Tanjore Painting",
    },
    detailedDescription: { 
      type: String, 
      default: "" 
    },
    goldPurity: { 
      type: String, 
      default: "Certified 22ct Gold Foil" 
    },
    materialBase: { 
      type: String, 
      default: "Water-resistant Plywood & Premium Cotton Cloth" 
    },

    // --- ASSETS & STATUS ---
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;