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
      default: ""
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
      required:false,
      select: false, 
    },
    primaryPhone: {
      type: String,
      required: false, // Changed to false for Google Auth compatibility
      unique: true,
      sparse: true, // CRITICAL: Allows multiple null/undefined values
      trim: true,
    },
    alternatePhone: {
      type: String,
      default: "",
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
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
