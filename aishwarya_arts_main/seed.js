import "dotenv/config";
import { connectDB } from "./app/lib/db.js";
import Product from "./app/lib/models/Product.js";

const allProducts = [
  {
    name: "Lord Balaji",
    slug: "lord-balaji",
    category: "Balaji",
    img: "/assets/Products/3+2/Balaji/balaji-22-frame.jpg",
    images: [
      "/assets/Products/webp/balaji mockup-2.webp",
      "/assets/Products/webp/balaji-3d-mockup-1.webp",
      "/assets/Products/3+2/Balaji/balaji-22 frame.jpg",
      "/assets/Products/3+2/Balaji/balaji-3d-mockup-1.jpg",
    ],
    desc: "Traditional Tanjore painting of Lord Balaji.",
    variations: {
      sizes: ["36x24 inches", "48x36 inches"],
      frameTypes: ["Flat", "2D", "3D Embossed"],
      prices: {},
    },
    tags: ["balaji", "tanjore"],
    inStock: true,
  },

  // 🔴 Add remaining 8 products here before seeding
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("🗑️ Old products removed");

    await Product.insertMany(allProducts);
    console.log("✅ Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();
