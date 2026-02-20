import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [false, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email ID is compulsory"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Security: won't show in queries by default
    },
    primaryPhone: {
      type: String,
      required: [false, "Primary contact number is required"],
      unique: true,
    },
    alternatePhone: {
      type: String,
      default: "", // Optional
    },
    avatar: {
      type: String,
      default: "/assets/about/men-2.png", // Stores the chosen avatar ID or URL
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Detailed Address for Fragile Art Delivery
    address: {
      houseNo: { type: String, default: "" },
      street: { type: String, default: "" },
      landmark: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
      country: { type: String, default: "India" },
    },
    // Useful for e-commerce analytics later
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;