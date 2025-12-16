import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    img: { type: String, required: true }, 
    images: [{ type: String }],
    desc: { type: String },
    variations: {
      sizes: [{ type: String }],
      frameTypes: [{ type: String }],
      prices: { type: Map, of: Number }, 
    },
    tags: [{ type: String }],
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
