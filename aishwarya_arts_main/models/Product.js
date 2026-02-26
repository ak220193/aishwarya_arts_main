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
    description: {
      type: String,
      required: [true, "Product description is required"],
      default: "Handcrafted 22ct Gold Leaf Tanjore Painting",
    },
    price: {
      type: Number,
      required: [true, "Base price is required"],
    },
    offerPrice: {
      type: Number,
    },
    // CHANGED: Removed the strict enum or updated it to match UI categories
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "3D Tanjore Painting",
    },
    godName: {
      type: String,
      enum: [
        "amman",
        "annapoorni",
        "annamalai",
        "baba",
        "balaji lakshmi",
        "balaji thayaar",
        "datchnamoorthy",
        "durga devi",
        "ganesha",
        "gayathri devi",
        "guruvayurappan",
        "hanuman",
        "kamadenu",
        "krishna",
        "lakshmi",
        "lalitha devi",
        "lakshmi narayana",
        "meenakshi",
        "murugan",
        "pooja set painting",
        "raja raja rajeshwari",
        "ramar",
        "renuga devi",
        "sathya narayana",
        "shiva family",
        "shanvanthri",
        "vishwa brahma",
        "gajalakshmi",
        "others",
        "",
      ],
      default: "",
    },
    // CALIBRATED: Added 'flat' and 'embossed' to match your new UI array
    workStyle: {
      type: String,
      enum: ["3d", "2d", "flat", "embossed"],
      default: "3d",
    },
    dimensions: {
      type: String,
      default: "12x15 inches",
    },
    frameType: {
      type: String,
      default: "Genuine Teak Wood",
    },
    weight: {
      type: String,
      default: "2.5 kg",
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    leadTime: {
      type: String,
      default: "Ready to Ship",
    },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
