import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String }, // Optional: if using Cloudinary
      },
    ],

    stock: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },

    brand: {
      type: String,
      default: "Generic",
    },

    tags: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
