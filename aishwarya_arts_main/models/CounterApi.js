import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  dateStr: { type: String, required: true, unique: true }, // e.g., "0803"
  seq: { type: Number, default: 0 },
});

export default mongoose.models.Counter || mongoose.model("Counter", counterSchema);