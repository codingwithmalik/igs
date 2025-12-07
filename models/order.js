import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [{ type: Object, required: true }],
    total: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
