import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // ADDED THIS
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        // SNAPSHOTS: These ensure the order history never changes
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        // CUSTOMIZATION: Essential for Tanjore paintings
        size: { type: String }, 
        frame: { type: String },
        style: { type: String }, // e.g., 2D, 3D, Flat
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true }, 
      address: String,
      houseNo: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
    paymentMethod: { type: String, required: true, default: "Online" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    // RAZORPAY DATA: To track the actual transaction
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    logisticsPartner: { 
      type: String, 
      default: "" // e.g., BlueDart, Delhivery
    },
    trackingId: { 
      type: String, 
      default: "" 
    },
    paidAt: { type: Date }, // Useful for accounting
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;