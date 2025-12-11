import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      en: {
        type: String,
        required: [true, "Product name is required"],
      },
      ur: {
        type: String,
        required: [true, "Product name is required"],
      },
    },
    description: {
      en: {
        type: String,
        required: [true, "Product description is required"],
      },
      ur: {
        type: String,
        required: [true, "Product description is required"],
      },
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    category: {
      en: {
        type: String,
        required: [true, "Product category is required"],
      },
      ur: {
        type: String,
        required: [true, "Product category is required"],
      },
    },
    imageURL: {
      url: { type: String, required: true },
    },
    brand: {
      en: {
        type: String,
        required: [true, "Product brand is required"],
      },
      ur: {
        type: String,
        required: [true, "Product brand is required"],
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isNumerical: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
