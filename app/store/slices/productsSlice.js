// src/store/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  products: [
    {
      id: 1,
      name: { en: "Basmati Rice", ur: "باسمتی چاول" },
      price: 200,
      description: {
        en: "Long-grain aromatic rice perfect for daily meals and special dishes.",
        ur: "روزمرہ کے کھانوں اور خاص پکوانوں کے لیے لمبے دانے والے خوشبودار چاول۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "Royal Harvest", ur: "رائل ہارویسٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 2,
      name: { en: "Whole Wheat Flour", ur: "مکمل گندم کا آٹا" },
      price: 50,
      description: {
        en: "High-quality whole wheat flour ideal for baking and chapatis.",
        ur: "بیکنگ اور چپاتیوں کے لیے اعلیٰ معیار کا مکمل گندم کا آٹا۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "GrainMill", ur: "گرین مل" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
    {
      id: 3,
      name: { en: "Rolled Oats", ur: "رولڈ اوٹس" },

      price: 9000,
      description: {
        en: "Nutritious rolled oats great for breakfast bowls and baking.",
        ur: "غذائیت سے بھرپور رولڈ اوٹس جو ناشتے کے پیالوں اور بیکنگ کے لیے بہترین ہیں۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "OatVille", ur: "اوٹ ویل" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 4,
      name: { en: "Quinoa", ur: "کینوا" },
      price: 230,
      description: {
        en: "Protein-rich white quinoa, perfect for salads and healthy meals.",
        ur: "پروٹین سے بھرپور سفید کینوا، سلاد اور صحت مند کھانوں کے لیے بہترین۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "NutriSeed", ur: "نیوٹری سیڈ" },
      isAvailable: false,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
  ],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Set all products
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    // Add a new product
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // Update a product
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },

    // Delete a product
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    // Loading and error handling (optional)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} = productsSlice.actions;

// Export reducer
export default productsSlice.reducer;
