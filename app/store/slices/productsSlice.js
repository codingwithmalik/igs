// src/store/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  products: [
    // Beverages (5 products)
    {
      id: 1,
      name: { en: "Mango Juice", ur: "آم کا جوس" },
      price: 150,
      description: {
        en: "Fresh and delicious mango juice made from real mangoes.",
        ur: "اصلی آموں سے بنا ہوا تازہ اور مزیدار آم کا جوس۔",
      },
      category: "beverages",
      brand: { en: "Shezan", ur: "شیزان" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    },
    {
      id: 2,
      name: { en: "Coca Cola", ur: "کوکا کولا" },
      price: 80,
      description: {
        en: "Classic refreshing cola soft drink.",
        ur: "کلاسک تازہ کولا سافٹ ڈرنک۔",
      },
      category: "beverages",
      brand: { en: "Coca Cola", ur: "کوکا کولا" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
    },
    {
      id: 3,
      name: { en: "Mineral Water", ur: "منرل واٹر" },
      price: 50,
      description: {
        en: "Pure mineral water for healthy hydration.",
        ur: "صحت مند ہائیڈریشن کے لیے خالص منرل واٹر۔",
      },
      category: "beverages",
      brand: { en: "Nestle", ur: "نیسلے" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
    },
    {
      id: 4,
      name: { en: "Orange Juice", ur: "سنگترے کا جوس" },
      price: 140,
      description: {
        en: "Freshly squeezed orange juice packed with vitamin C.",
        ur: "وٹامن سی سے بھرپور تازہ نچوڑا ہوا سنگترے کا جوس۔",
      },
      category: "beverages",
      brand: { en: "Minute Maid", ur: "منٹ میڈ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    },
    {
      id: 5,
      name: { en: "Lemon Soda", ur: "لیموں سوڈا" },
      price: 70,
      description: {
        en: "Refreshing lemon-flavored carbonated drink.",
        ur: "تازگی بخش لیموں کے ذائقے والا کاربونیٹڈ مشروب۔",
      },
      category: "beverages",
      brand: { en: "7UP", ur: "سیون اپ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400",
    },

    // Snacks & Chips (6 products)
    {
      id: 6,
      name: { en: "Potato Chips", ur: "آلو کے چپس" },
      price: 60,
      description: {
        en: "Crispy and crunchy potato chips with salt.",
        ur: "نمک کے ساتھ کرکرے اور کرنچی آلو کے چپس۔",
      },
      category: "snacksChips",
      brand: { en: "Lays", ur: "لیز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    },
    {
      id: 7,
      name: { en: "Cheese Balls", ur: "چیز بالز" },
      price: 55,
      description: {
        en: "Delicious cheesy puff snacks for all ages.",
        ur: "تمام عمر کے لوگوں کے لیے مزیدار چیزی پف اسنیکس۔",
      },
      category: "snacksChips",
      brand: { en: "Kurkure", ur: "کرکرے" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400",
    },
    {
      id: 8,
      name: { en: "Corn Chips", ur: "مکئی کے چپس" },
      price: 65,
      description: {
        en: "Crunchy corn chips perfect for dipping.",
        ur: "ڈپنگ کے لیے بہترین کرنچی مکئی کے چپس۔",
      },
      category: "snacksChips",
      brand: { en: "Doritos", ur: "ڈوریٹوز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1613919767811-72f64dd0dfd2?w=400",
    },
    {
      id: 9,
      name: { en: "Popcorn", ur: "پاپ کارن" },
      price: 45,
      description: {
        en: "Light and fluffy popcorn with butter flavor.",
        ur: "مکھن کے ذائقے کے ساتھ ہلکا اور پھولا ہوا پاپ کارن۔",
      },
      category: "snacksChips",
      brand: { en: "Act II", ur: "ایکٹ ٹو" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400",
    },
    {
      id: 10,
      name: { en: "Salted Peanuts", ur: "نمکین مونگ پھلی" },
      price: 50,
      description: {
        en: "Roasted and salted peanuts for healthy snacking.",
        ur: "صحت مند اسنیکنگ کے لیے بھنی ہوئی اور نمکین مونگ پھلی۔",
      },
      category: "snacksChips",
      brand: { en: "Wonder", ur: "ونڈر" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400",
    },
    {
      id: 11,
      name: { en: "Rice Crackers", ur: "چاول کے کریکرز" },
      price: 40,
      description: {
        en: "Light and crispy rice crackers, a healthier snack option.",
        ur: "ہلکے اور کرکرے چاول کے کریکرز، ایک صحت مند اسنیک آپشن۔",
      },
      category: "snacksChips",
      brand: { en: "Oriental", ur: "اورینٹل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1588940844731-6a4502b80c6e?w=400",
    },

    // Sweets & Candies (5 products)
    {
      id: 12,
      name: { en: "Chocolate Bar", ur: "چاکلیٹ بار" },
      price: 100,
      description: {
        en: "Rich and creamy milk chocolate bar.",
        ur: "امیر اور کریمی دودھ کی چاکلیٹ بار۔",
      },
      category: "sweetsCandies",
      brand: { en: "Cadbury", ur: "کیڈبری" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1606312619070-d48b4a0a4df5?w=400",
    },
    {
      id: 13,
      name: { en: "Gummy Bears", ur: "گمی بیئرز" },
      price: 75,
      description: {
        en: "Soft and chewy fruit-flavored gummy candies.",
        ur: "نرم اور چبانے والی پھلوں کے ذائقے والی گمی کینڈیز۔",
      },
      category: "sweetsCandies",
      brand: { en: "Haribo", ur: "ہاریبو" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    },
    {
      id: 14,
      name: { en: "Lollipops", ur: "لالی پاپ" },
      price: 30,
      description: {
        en: "Colorful and sweet lollipops in various flavors.",
        ur: "مختلف ذائقوں میں رنگین اور میٹھے لالی پاپ۔",
      },
      category: "sweetsCandies",
      brand: { en: "Chupa Chups", ur: "چوپا چپس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1625869016774-3a92be2ae2cd?w=400",
    },
    {
      id: 15,
      name: { en: "Caramel Toffee", ur: "کیرامل ٹافی" },
      price: 50,
      description: {
        en: "Smooth and buttery caramel toffee candies.",
        ur: "ہموار اور مکھنی کیرامل ٹافی کینڈیز۔",
      },
      category: "sweetsCandies",
      brand: { en: "Eclairs", ur: "ایکلیئرز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1581798459219-c8f1e5bbf87c?w=400",
    },
    {
      id: 16,
      name: { en: "Mint Candies", ur: "پودینے کی کینڈیز" },
      price: 35,
      description: {
        en: "Refreshing mint candies for fresh breath.",
        ur: "تازہ سانس کے لیے تازگی بخش پودینے کی کینڈیز۔",
      },
      category: "sweetsCandies",
      brand: { en: "Mentos", ur: "مینٹوس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    },

    // Rice & Grains (6 products)
    {
      id: 17,
      name: { en: "Basmati Rice", ur: "باسمتی چاول" },
      price: 200,
      description: {
        en: "Long-grain aromatic rice perfect for daily meals and special dishes.",
        ur: "روزمرہ کے کھانوں اور خاص پکوانوں کے لیے لمبے دانے والے خوشبودار چاول۔",
      },
      category: "riceGrains",
      brand: { en: "Royal Harvest", ur: "رائل ہارویسٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    },
    {
      id: 18,
      name: { en: "White Rice", ur: "سفید چاول" },
      price: 150,
      description: {
        en: "Premium quality white rice for everyday cooking.",
        ur: "روزمرہ پکانے کے لیے پریمیم کوالٹی سفید چاول۔",
      },
      category: "riceGrains",
      brand: { en: "Super Kernel", ur: "سپر کرنل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400",
    },
    {
      id: 19,
      name: { en: "Brown Rice", ur: "بھورے چاول" },
      price: 180,
      description: {
        en: "Nutritious whole grain brown rice rich in fiber.",
        ur: "فائبر سے بھرپور غذائیت سے بھرپور سارا اناج بھورے چاول۔",
      },
      category: "riceGrains",
      brand: { en: "Organic Valley", ur: "آرگینک ویلی" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    },
    {
      id: 20,
      name: { en: "Wheat Flour", ur: "گندم کا آٹا" },
      price: 120,
      description: {
        en: "Fine quality wheat flour for rotis and baking.",
        ur: "روٹی اور بیکنگ کے لیے عمدہ معیار کا گندم کا آٹا۔",
      },
      category: "riceGrains",
      brand: { en: "Ashirwad", ur: "آشیرواد" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1628588678396-e88085d4b0b4?w=400",
    },
    {
      id: 21,
      name: { en: "Corn Flour", ur: "مکئی کا آٹا" },
      price: 90,
      description: {
        en: "Pure corn flour for thickening and baking.",
        ur: "گاڑھا کرنے اور بیکنگ کے لیے خالص مکئی کا آٹا۔",
      },
      category: "riceGrains",
      brand: { en: "National", ur: "نیشنل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1583483425010-c566431a7710?w=400",
    },
    {
      id: 22,
      name: { en: "Oats", ur: "جئی" },
      price: 160,
      description: {
        en: "Healthy whole grain oats for breakfast.",
        ur: "ناشتے کے لیے صحت مند سارا اناج جئی۔",
      },
      category: "riceGrains",
      brand: { en: "Quaker", ur: "کویکر" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400",
    },

    // Spices & Seasonings (6 products)
    {
      id: 23,
      name: { en: "Red Chili Powder", ur: "لال مرچ پاؤڈر" },
      price: 70,
      description: {
        en: "Hot and spicy red chili powder for cooking.",
        ur: "کھانا پکانے کے لیے گرم اور مسالہ دار لال مرچ پاؤڈر۔",
      },
      category: "spicesSeasonings",
      brand: { en: "Shan", ur: "شان" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1599909533730-f9df132d1ab2?w=400",
    },
    {
      id: 24,
      name: { en: "Turmeric Powder", ur: "ہلدی پاؤڈر" },
      price: 60,
      description: {
        en: "Pure turmeric powder with health benefits.",
        ur: "صحت کے فوائد کے ساتھ خالص ہلدی پاؤڈر۔",
      },
      category: "spicesSeasonings",
      brand: { en: "National", ur: "نیشنل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
    },
    {
      id: 25,
      name: { en: "Cumin Seeds", ur: "زیرہ" },
      price: 80,
      description: {
        en: "Aromatic cumin seeds for tempering and cooking.",
        ur: "تڑکا اور کھانا پکانے کے لیے خوشبودار زیرہ۔",
      },
      category: "spicesSeasonings",
      brand: { en: "Mehran", ur: "مہران" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1596040033229-a0b78e2cde6e?w=400",
    },
    {
      id: 26,
      name: { en: "Coriander Powder", ur: "دھنیا پاؤڈر" },
      price: 65,
      description: {
        en: "Ground coriander powder for authentic flavor.",
        ur: "مستند ذائقے کے لیے پسا ہوا دھنیا پاؤڈر۔",
      },
      category: "spicesSeasonings",
      brand: { en: "Shan", ur: "شان" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1599909533730-f9df132d1ab2?w=400",
    },
    {
      id: 27,
      name: { en: "Garam Masala", ur: "گرم مصالحہ" },
      price: 95,
      description: {
        en: "Blend of aromatic spices for rich flavor.",
        ur: "بھرپور ذائقے کے لیے خوشبودار مصالحوں کا مرکب۔",
      },
      category: "spicesSeasonings",
      brand: { en: "National", ur: "نیشنل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1596040033229-a0b78e2cde6e?w=400",
    },
    {
      id: 28,
      name: { en: "Black Pepper", ur: "کالی مرچ" },
      price: 110,
      description: {
        en: "Whole black pepper for grinding and seasoning.",
        ur: "پیسنے اور سیزننگ کے لیے سیاہ کالی مرچ۔",
      },
      category: "spicesSeasonings",
      brand: { en: "Mehran", ur: "مہران" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1599909533730-f9df132d1ab2?w=400",
    },

    // Cooking Oil (5 products)
    {
      id: 29,
      name: { en: "Sunflower Oil", ur: "سورج مکھی کا تیل" },
      price: 350,
      description: {
        en: "Light and healthy sunflower cooking oil.",
        ur: "ہلکا اور صحت مند سورج مکھی کا کھانا پکانے کا تیل۔",
      },
      category: "cookingOil",
      brand: { en: "Dalda", ur: "ڈالڈا" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    },
    {
      id: 30,
      name: { en: "Canola Oil", ur: "کینولا تیل" },
      price: 380,
      description: {
        en: "Heart-healthy canola oil for everyday cooking.",
        ur: "روزمرہ کھانا پکانے کے لیے دل کے لیے صحت مند کینولا تیل۔",
      },
      category: "cookingOil",
      brand: { en: "Seasons", ur: "سیزنز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    },
    {
      id: 31,
      name: { en: "Olive Oil", ur: "زیتون کا تیل" },
      price: 650,
      description: {
        en: "Premium extra virgin olive oil for healthy cooking.",
        ur: "صحت مند کھانا پکانے کے لیے پریمیم ایکسٹرا ورجن زیتون کا تیل۔",
      },
      category: "cookingOil",
      brand: { en: "Borges", ur: "بورجیز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    },
    {
      id: 32,
      name: { en: "Vegetable Ghee", ur: "بنسپتی گھی" },
      price: 420,
      description: {
        en: "Pure vegetable ghee for traditional cooking.",
        ur: "روایتی کھانا پکانے کے لیے خالص بنسپتی گھی۔",
      },
      category: "cookingOil",
      brand: { en: "Kausar", ur: "کوثر" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    },
    {
      id: 33,
      name: { en: "Corn Oil", ur: "مکئی کا تیل" },
      price: 340,
      description: {
        en: "Light corn oil perfect for frying and cooking.",
        ur: "تلنے اور پکانے کے لیے بہترین ہلکا مکئی کا تیل۔",
      },
      category: "cookingOil",
      brand: { en: "Habib", ur: "حبیب" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    },

    // Canned Foods (5 products)
    {
      id: 34,
      name: { en: "Baked Beans", ur: "بیکڈ بینز" },
      price: 120,
      description: {
        en: "Delicious baked beans in tomato sauce.",
        ur: "ٹماٹر کی چٹنی میں مزیدار بیکڈ بینز۔",
      },
      category: "cannedFoods",
      brand: { en: "Heinz", ur: "ہینز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400",
    },
    {
      id: 35,
      name: { en: "Tuna Fish", ur: "ٹونا مچھلی" },
      price: 250,
      description: {
        en: "Premium quality canned tuna in oil.",
        ur: "تیل میں پریمیم کوالٹی کینڈ ٹونا۔",
      },
      category: "cannedFoods",
      brand: { en: "John West", ur: "جان ویسٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400",
    },
    {
      id: 36,
      name: { en: "Sweet Corn", ur: "میٹھی مکئی" },
      price: 95,
      description: {
        en: "Sweet and tender canned corn kernels.",
        ur: "میٹھے اور نرم کینڈ مکئی کے دانے۔",
      },
      category: "cannedFoods",
      brand: { en: "Del Monte", ur: "ڈیل مونٹے" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400",
    },
    {
      id: 37,
      name: { en: "Mushrooms", ur: "کھمبیاں" },
      price: 140,
      description: {
        en: "Sliced mushrooms in brine, ready to use.",
        ur: "نمکین پانی میں کٹی ہوئی کھمبیاں، استعمال کے لیے تیار۔",
      },
      category: "cannedFoods",
      brand: { en: "Gourmet", ur: "گورمیٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400",
    },
    {
      id: 38,
      name: { en: "Tomato Paste", ur: "ٹماٹر کا پیسٹ" },
      price: 85,
      description: {
        en: "Concentrated tomato paste for rich flavor.",
        ur: "بھرپور ذائقے کے لیے مرتکز ٹماٹر کا پیسٹ۔",
      },
      category: "cannedFoods",
      brand: { en: "National", ur: "نیشنل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400",
    },

    // Pasta & Noodles (5 products)
    {
      id: 39,
      name: { en: "Spaghetti", ur: "سپیگیٹی" },
      price: 110,
      description: {
        en: "Long Italian pasta perfect for various sauces.",
        ur: "مختلف چٹنیوں کے لیے بہترین لمبا اطالوی پاستا۔",
      },
      category: "pastaNoodles",
      brand: { en: "Kolson", ur: "کولسن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1551462147-37ee26c83a94?w=400",
    },
    {
      id: 40,
      name: { en: "Macaroni", ur: "میکرونی" },
      price: 100,
      description: {
        en: "Elbow macaroni for classic mac and cheese.",
        ur: "کلاسک میک اینڈ چیز کے لیے کہنی میکرونی۔",
      },
      category: "pastaNoodles",
      brand: { en: "Kolson", ur: "کولسن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    },
    {
      id: 41,
      name: { en: "Instant Noodles", ur: "فوری نوڈلز" },
      price: 40,
      description: {
        en: "Quick and easy instant noodles for a fast meal.",
        ur: "فوری کھانے کے لیے جلدی اور آسان فوری نوڈلز۔",
      },
      category: "pastaNoodles",
      brand: { en: "Indomie", ur: "انڈومی" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    },
    {
      id: 42,
      name: { en: "Vermicelli", ur: "سیویاں" },
      price: 75,
      description: {
        en: "Fine vermicelli for sweet and savory dishes.",
        ur: "میٹھے اور نمکین پکوانوں کے لیے باریک سیویاں۔",
      },
      category: "pastaNoodles",
      brand: { en: "Shan", ur: "شان" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1551462147-37ee26c83a94?w=400",
    },
    {
      id: 43,
      name: { en: "Penne Pasta", ur: "پین پاستا" },
      price: 115,
      description: {
        en: "Tube-shaped pasta ideal for baked dishes.",
        ur: "پکے ہوئے پکوانوں کے لیے مثالی ٹیوب کی شکل کا پاستا۔",
      },
      category: "pastaNoodles",
      brand: { en: "Barilla", ur: "باریلا" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    },

    // Tea & Coffee (6 products)
    {
      id: 44,
      name: { en: "Black Tea", ur: "سیاہ چائے" },
      price: 180,
      description: {
        en: "Premium quality black tea leaves for strong flavor.",
        ur: "مضبوط ذائقے کے لیے پریمیم کوالٹی سیاہ چائے کے پتے۔",
      },
      category: "teaCoffee",
      brand: { en: "Tapal", ur: "تپال" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400",
    },
    {
      id: 45,
      name: { en: "Green Tea", ur: "سبز چائے" },
      price: 220,
      description: {
        en: "Healthy green tea rich in antioxidants.",
        ur: "اینٹی آکسیڈنٹس سے بھرپور صحت مند سبز چائے۔",
      },
      category: "teaCoffee",
      brand: { en: "Lipton", ur: "لپٹن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    },
    {
      id: 46,
      name: { en: "Instant Coffee", ur: "فوری کافی" },
      price: 280,
      description: {
        en: "Premium instant coffee for quick preparation.",
        ur: "فوری تیاری کے لیے پریمیم فوری کافی۔",
      },
      category: "teaCoffee",
      brand: { en: "Nescafe", ur: "نیسکیفے" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
    },
    {
      id: 47,
      name: { en: "Coffee Beans", ur: "کافی کے دانے" },
      price: 450,
      description: {
        en: "Freshly roasted coffee beans for grinding.",
        ur: "پیسنے کے لیے تازہ بھنے ہوئے کافی کے دانے۔",
      },
      category: "teaCoffee",
      brand: { en: "Starbucks", ur: "سٹاربکس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    },
    {
      id: 48,
      name: { en: "Herbal Tea", ur: "جڑی بوٹیوں کی چائے" },
      price: 250,
      description: {
        en: "Caffeine-free herbal tea for relaxation.",
        ur: "آرام کے لیے کیفین سے پاک جڑی بوٹیوں کی چائے۔",
      },
      category: "teaCoffee",
      brand: { en: "Twinings", ur: "ٹوائننگز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    },
    {
      id: 49,
      name: { en: "Tea Bags", ur: "ٹی بیگز" },
      price: 160,
      description: {
        en: "Convenient tea bags for easy brewing.",
        ur: "آسان بریونگ کے لیے آسان ٹی بیگز۔",
      },
      category: "teaCoffee",
      brand: { en: "Lipton", ur: "لپٹن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400",
    },

    // Sugar & Sweeteners (4 products)
    {
      id: 50,
      name: { en: "White Sugar", ur: "سفید چینی" },
      price: 130,
      description: {
        en: "Pure white refined sugar for sweetening.",
        ur: "میٹھا کرنے کے لیے خالص سفید صاف شدہ چینی۔",
      },
      category: "sugarSweeteners",
      brand: { en: "Al-Baker", ur: "البیکر" },
      isAvailable: true,
      isNumerical: false,
      imageURL:
        "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400",
    },
    {
      id: 51,
      name: { en: "Brown Sugar", ur: "بھوری چینی" },
      price: 150,
      description: {
        en: "Natural brown sugar with molasses flavor.",
        ur: "گڑ کے ذائقے کے ساتھ قدرتی بھوری چینی۔",
      },
      category: "sugarSweeteners",
      brand: { en: "Organic", ur: "آرگینک" },
      isAvailable: true,
      isNumerical: false,
      imageURL:
        "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400",
    },
    {
      id: 52,
      name: { en: "Honey", ur: "شہد" },
      price: 320,
      description: {
        en: "Pure natural honey from wildflowers.",
        ur: "جنگلی پھولوں سے خالص قدرتی شہد۔",
      },
      category: "sugarSweeteners",
      brand: { en: "Qarshi", ur: "قرشی" },
      isAvailable: true,
      isNumerical: false,
      imageURL:
        "https://images.unsplash.com/photo-1587049352846-4a222e784362?w=400",
    },
    {
      id: 53,
      name: { en: "Artificial Sweetener", ur: "مصنوعی میٹھا" },
      price: 180,
      description: {
        en: "Zero-calorie sweetener for diabetics.",
        ur: "ذیابیطس کے مریضوں کے لیے صفر کیلوری میٹھا۔",
      },
      category: "sugarSweeteners",
      brand: { en: "Equal", ur: "ایکول" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400",
    },

    // Personal Care (6 products)
    {
      id: 54,
      name: { en: "Shampoo", ur: "شیمپو" },
      price: 280,
      description: {
        en: "Nourishing shampoo for healthy hair.",
        ur: "صحت مند بالوں کے لیے غذائیت بخش شیمپو۔",
      },
      category: "personalCare",
      brand: { en: "Head & Shoulders", ur: "ہیڈ اینڈ شولڈرز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400",
    },
    {
      id: 55,
      name: { en: "Soap Bar", ur: "صابن" },
      price: 80,
      description: {
        en: "Gentle cleansing soap for soft skin.",
        ur: "نرم جلد کے لیے نرم صفائی کا صابن۔",
      },
      category: "personalCare",
      brand: { en: "Lux", ur: "لکس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1609692814858-481f149e73b4?w=400",
    },
    {
      id: 56,
      name: { en: "Toothpaste", ur: "ٹوتھ پیسٹ" },
      price: 120,
      description: {
        en: "Fluoride toothpaste for strong teeth.",
        ur: "مضبوط دانتوں کے لیے فلورائیڈ ٹوتھ پیسٹ۔",
      },
      category: "personalCare",
      brand: { en: "Colgate", ur: "کولگیٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400",
    },
    {
      id: 57,
      name: { en: "Body Lotion", ur: "باڈی لوشن" },
      price: 350,
      description: {
        en: "Moisturizing body lotion for smooth skin.",
        ur: "ہموار جلد کے لیے نمی بخش باڈی لوشن۔",
      },
      category: "personalCare",
      brand: { en: "Vaseline", ur: "ویسلین" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    },
    {
      id: 58,
      name: { en: "Face Wash", ur: "فیس واش" },
      price: 240,
      description: {
        en: "Deep cleansing face wash for clear skin.",
        ur: "صاف جلد کے لیے گہری صفائی کا فیس واش۔",
      },
      category: "personalCare",
      brand: { en: "Garnier", ur: "گارنیئر" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    },
    {
      id: 59,
      name: { en: "Deodorant", ur: "ڈیوڈورنٹ" },
      price: 190,
      description: {
        en: "Long-lasting protection against odor.",
        ur: "بدبو کے خلاف طویل المیعاد تحفظ۔",
      },
      category: "personalCare",
      brand: { en: "Rexona", ur: "ریکسونا" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    },

    // Household Cleaning (5 products)
    {
      id: 60,
      name: { en: "Dishwashing Liquid", ur: "برتن دھونے کا مائع" },
      price: 140,
      description: {
        en: "Powerful dishwashing liquid for grease removal.",
        ur: "چکنائی ہٹانے کے لیے طاقتور برتن دھونے کا مائع۔",
      },
      category: "householdCleaning",
      brand: { en: "Vim", ur: "وِم" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    },
    {
      id: 61,
      name: { en: "Floor Cleaner", ur: "فرش صاف کرنے والا" },
      price: 180,
      description: {
        en: "Disinfectant floor cleaner for all surfaces.",
        ur: "تمام سطحوں کے لیے جراثیم کش فرش صاف کرنے والا۔",
      },
      category: "householdCleaning",
      brand: { en: "Lizol", ur: "لیزول" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    },
    {
      id: 62,
      name: { en: "Glass Cleaner", ur: "شیشہ صاف کرنے والا" },
      price: 160,
      description: {
        en: "Streak-free glass and window cleaner.",
        ur: "لکیر سے پاک شیشہ اور کھڑکی صاف کرنے والا۔",
      },
      category: "householdCleaning",
      brand: { en: "Colin", ur: "کولن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    },
    {
      id: 63,
      name: { en: "Bathroom Cleaner", ur: "باتھ روم صاف کرنے والا" },
      price: 170,
      description: {
        en: "Powerful cleaner for bathroom tiles and fixtures.",
        ur: "باتھ روم کی ٹائلوں اور فکسچر کے لیے طاقتور صاف کرنے والا۔",
      },
      category: "householdCleaning",
      brand: { en: "Harpic", ur: "ہارپک" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    },
    {
      id: 64,
      name: { en: "All-Purpose Cleaner", ur: "ہر مقصد کے لیے صاف کرنے والا" },
      price: 150,
      description: {
        en: "Multi-surface cleaner for kitchen and home.",
        ur: "باورچی خانے اور گھر کے لیے کثیر سطح صاف کرنے والا۔",
      },
      category: "householdCleaning",
      brand: { en: "Mr. Muscle", ur: "مسٹر مسل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    },

    // Laundry Detergents (5 products)
    {
      id: 65,
      name: { en: "Washing Powder", ur: "دھونے کا پاؤڈر" },
      price: 280,
      description: {
        en: "Powerful detergent powder for clean clothes.",
        ur: "صاف کپڑوں کے لیے طاقتور ڈٹرجنٹ پاؤڈر۔",
      },
      category: "laundryDetergents",
      brand: { en: "Surf Excel", ur: "سرف ایکسل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    },
    {
      id: 66,
      name: { en: "Liquid Detergent", ur: "مائع ڈٹرجنٹ" },
      price: 320,
      description: {
        en: "Concentrated liquid detergent for front-load machines.",
        ur: "فرنٹ لوڈ مشینوں کے لیے مرتکز مائع ڈٹرجنٹ۔",
      },
      category: "laundryDetergents",
      brand: { en: "Ariel", ur: "ایریل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    },
    {
      id: 67,
      name: { en: "Fabric Softener", ur: "فیبرک سافٹنر" },
      price: 200,
      description: {
        en: "Softens clothes and adds fresh fragrance.",
        ur: "کپڑوں کو نرم کرتا ہے اور تازہ خوشبو شامل کرتا ہے۔",
      },
      category: "laundryDetergents",
      brand: { en: "Comfort", ur: "کمفرٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    },
    {
      id: 68,
      name: { en: "Bleach", ur: "بلیچ" },
      price: 130,
      description: {
        en: "Whitening bleach for bright white clothes.",
        ur: "چمکدار سفید کپڑوں کے لیے سفیدی کرنے والا بلیچ۔",
      },
      category: "laundryDetergents",
      brand: { en: "Robin", ur: "رابن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    },
    {
      id: 69,
      name: { en: "Stain Remover", ur: "داغ ہٹانے والا" },
      price: 180,
      description: {
        en: "Powerful stain remover for tough stains.",
        ur: "سخت داغوں کے لیے طاقتور داغ ہٹانے والا۔",
      },
      category: "laundryDetergents",
      brand: { en: "Vanish", ur: "وینش" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    },

    // Paper Products (4 products)
    {
      id: 70,
      name: { en: "Tissue Paper", ur: "ٹشو پیپر" },
      price: 90,
      description: {
        en: "Soft and absorbent tissue paper for daily use.",
        ur: "روزمرہ استعمال کے لیے نرم اور جذب کرنے والا ٹشو پیپر۔",
      },
      category: "paperProducts",
      brand: { en: "Rose Petal", ur: "روز پیٹل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400",
    },
    {
      id: 71,
      name: { en: "Kitchen Towels", ur: "باورچی خانے کے تولیے" },
      price: 120,
      description: {
        en: "Strong and absorbent paper towels for cleaning.",
        ur: "صفائی کے لیے مضبوط اور جذب کرنے والے کاغذی تولیے۔",
      },
      category: "paperProducts",
      brand: { en: "Bounty", ur: "باونٹی" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400",
    },
    {
      id: 72,
      name: { en: "Toilet Paper", ur: "ٹائلٹ پیپر" },
      price: 150,
      description: {
        en: "Soft and comfortable toilet tissue rolls.",
        ur: "نرم اور آرام دہ ٹائلٹ ٹشو رولز۔",
      },
      category: "paperProducts",
      brand: { en: "Softex", ur: "سافٹیکس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400",
    },
    {
      id: 73,
      name: { en: "Napkins", ur: "نیپکن" },
      price: 60,
      description: {
        en: "Disposable paper napkins for meals.",
        ur: "کھانوں کے لیے ڈسپوزایبل کاغذی نیپکن۔",
      },
      category: "paperProducts",
      brand: { en: "Regina", ur: "ریجینا" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400",
    },

    // Baby Care (5 products)
    {
      id: 74,
      name: { en: "Baby Diapers", ur: "بچوں کے ڈائپرز" },
      price: 450,
      description: {
        en: "Soft and absorbent diapers for babies.",
        ur: "بچوں کے لیے نرم اور جذب کرنے والے ڈائپرز۔",
      },
      category: "babyCare",
      brand: { en: "Pampers", ur: "پیمپرز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    },
    {
      id: 75,
      name: { en: "Baby Wipes", ur: "بچوں کے وائپس" },
      price: 180,
      description: {
        en: "Gentle wet wipes for baby's sensitive skin.",
        ur: "بچے کی حساس جلد کے لیے نرم گیلے وائپس۔",
      },
      category: "babyCare",
      brand: { en: "Johnson's", ur: "جانسنز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    },
    {
      id: 76,
      name: { en: "Baby Powder", ur: "بچوں کا پاؤڈر" },
      price: 140,
      description: {
        en: "Talcum powder to keep baby dry and fresh.",
        ur: "بچے کو خشک اور تازہ رکھنے کے لیے ٹیلکم پاؤڈر۔",
      },
      category: "babyCare",
      brand: { en: "Johnson's", ur: "جانسنز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    },
    {
      id: 77,
      name: { en: "Baby Shampoo", ur: "بچوں کا شیمپو" },
      price: 220,
      description: {
        en: "Tear-free shampoo for gentle hair care.",
        ur: "نرم بالوں کی دیکھ بھال کے لیے آنسو سے پاک شیمپو۔",
      },
      category: "babyCare",
      brand: { en: "Johnson's", ur: "جانسنز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    },
    {
      id: 78,
      name: { en: "Baby Lotion", ur: "بچوں کا لوشن" },
      price: 200,
      description: {
        en: "Moisturizing lotion for soft baby skin.",
        ur: "نرم بچے کی جلد کے لیے نمی بخش لوشن۔",
      },
      category: "babyCare",
      brand: { en: "Johnson's", ur: "جانسنز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    },

    // Health & Wellness (5 products)
    {
      id: 79,
      name: { en: "Multivitamins", ur: "ملٹی وٹامنز" },
      price: 380,
      description: {
        en: "Complete daily multivitamin supplement.",
        ur: "مکمل روزانہ ملٹی وٹامن سپلیمنٹ۔",
      },
      category: "healthWellness",
      brand: { en: "Centrum", ur: "سینٹرم" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    },
    {
      id: 80,
      name: { en: "Vitamin C Tablets", ur: "وٹامن سی گولیاں" },
      price: 250,
      description: {
        en: "Immune-boosting vitamin C supplement.",
        ur: "قوت مدافعت بڑھانے والا وٹامن سی سپلیمنٹ۔",
      },
      category: "healthWellness",
      brand: { en: "Redoxon", ur: "ریڈوکسن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    },
    {
      id: 81,
      name: { en: "Protein Powder", ur: "پروٹین پاؤڈر" },
      price: 1200,
      description: {
        en: "Whey protein powder for muscle building.",
        ur: "پٹھوں کی تعمیر کے لیے وے پروٹین پاؤڈر۔",
      },
      category: "healthWellness",
      brand: { en: "Optimum Nutrition", ur: "آپٹیمم نیوٹریشن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
    },
    {
      id: 82,
      name: { en: "Omega-3 Fish Oil", ur: "اومیگا 3 فش آئل" },
      price: 650,
      description: {
        en: "Heart-healthy omega-3 supplement.",
        ur: "دل کے لیے صحت مند اومیگا 3 سپلیمنٹ۔",
      },
      category: "healthWellness",
      brand: { en: "Nature's Bounty", ur: "نیچرز باونٹی" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    },
    {
      id: 83,
      name: { en: "Calcium Tablets", ur: "کیلشیم گولیاں" },
      price: 280,
      description: {
        en: "Calcium supplement for strong bones.",
        ur: "مضبوط ہڈیوں کے لیے کیلشیم سپلیمنٹ۔",
      },
      category: "healthWellness",
      brand: { en: "Caltrate", ur: "کالٹریٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    },

    // Frozen Foods (5 products)
    {
      id: 84,
      name: { en: "Frozen Chicken Nuggets", ur: "منجمد چکن نگٹس" },
      price: 380,
      description: {
        en: "Crispy frozen chicken nuggets ready to fry.",
        ur: "تلنے کے لیے تیار کرکرے منجمد چکن نگٹس۔",
      },
      category: "frozenFoods",
      brand: { en: "K&N's", ur: "کے این ایس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
    },
    {
      id: 85,
      name: { en: "Frozen Vegetables", ur: "منجمد سبزیاں" },
      price: 220,
      description: {
        en: "Mixed frozen vegetables for healthy meals.",
        ur: "صحت مند کھانوں کے لیے مخلوط منجمد سبزیاں۔",
      },
      category: "frozenFoods",
      brand: { en: "McCain", ur: "میک کین" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400",
    },
    {
      id: 86,
      name: { en: "French Fries", ur: "فرینچ فرائز" },
      price: 180,
      description: {
        en: "Crispy frozen french fries for quick snacking.",
        ur: "فوری اسنیکنگ کے لیے کرکرے منجمد فرینچ فرائز۔",
      },
      category: "frozenFoods",
      brand: { en: "McCain", ur: "میک کین" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
    },
    {
      id: 87,
      name: { en: "Frozen Parathas", ur: "منجمد پراٹھے" },
      price: 240,
      description: {
        en: "Ready-to-cook frozen parathas for breakfast.",
        ur: "ناشتے کے لیے پکانے کے لیے تیار منجمد پراٹھے۔",
      },
      category: "frozenFoods",
      brand: { en: "K&N's", ur: "کے این ایس" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    },
    {
      id: 88,
      name: { en: "Ice Cream", ur: "آئس کریم" },
      price: 350,
      description: {
        en: "Creamy vanilla ice cream for dessert.",
        ur: "میٹھے کے لیے کریمی ونیلا آئس کریم۔",
      },
      category: "frozenFoods",
      brand: { en: "Walls", ur: "والز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    },

    // Condiments & Sauces (6 products)
    {
      id: 89,
      name: { en: "Ketchup", ur: "کیچپ" },
      price: 140,
      description: {
        en: "Tomato ketchup for all your favorite foods.",
        ur: "آپ کے تمام پسندیدہ کھانوں کے لیے ٹماٹر کیچپ۔",
      },
      category: "condimentsSauces",
      brand: { en: "National", ur: "نیشنل" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621958181821-bb96c0c8ad47?w=400",
    },
    {
      id: 90,
      name: { en: "Mayonnaise", ur: "مایونیز" },
      price: 160,
      description: {
        en: "Creamy mayonnaise for sandwiches and salads.",
        ur: "سینڈوچز اور سلاد کے لیے کریمی مایونیز۔",
      },
      category: "condimentsSauces",
      brand: { en: "Shezan", ur: "شیزان" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621958181821-bb96c0c8ad47?w=400",
    },
    {
      id: 91,
      name: { en: "Soy Sauce", ur: "سویا ساس" },
      price: 120,
      description: {
        en: "Authentic soy sauce for Asian cuisine.",
        ur: "ایشیائی کھانوں کے لیے مستند سویا ساس۔",
      },
      category: "condimentsSauces",
      brand: { en: "Kikkoman", ur: "کیکومین" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621958181821-bb96c0c8ad47?w=400",
    },
    {
      id: 92,
      name: { en: "Chili Sauce", ur: "مرچ کی چٹنی" },
      price: 110,
      description: {
        en: "Hot and spicy chili sauce for extra flavor.",
        ur: "اضافی ذائقے کے لیے گرم اور مسالہ دار مرچ کی چٹنی۔",
      },
      category: "condimentsSauces",
      brand: { en: "Shan", ur: "شان" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621958181821-bb96c0c8ad47?w=400",
    },
    {
      id: 93,
      name: { en: "Mustard Sauce", ur: "سرسوں کی چٹنی" },
      price: 130,
      description: {
        en: "Tangy mustard sauce for hot dogs and burgers.",
        ur: "ہاٹ ڈاگ اور برگر کے لیے چٹخارے دار سرسوں کی چٹنی۔",
      },
      category: "condimentsSauces",
      brand: { en: "French's", ur: "فرینچز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621958181821-bb96c0c8ad47?w=400",
    },
    {
      id: 94,
      name: { en: "BBQ Sauce", ur: "بی بی کیو ساس" },
      price: 150,
      description: {
        en: "Smoky BBQ sauce for grilling and dipping.",
        ur: "گرل کرنے اور ڈپنگ کے لیے دھواں دار بی بی کیو ساس۔",
      },
      category: "condimentsSauces",
      brand: { en: "Bull's Eye", ur: "بلز آئی" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1621958181821-bb96c0c8ad47?w=400",
    },

    // Breakfast Cereals (6 products)
    {
      id: 95,
      name: { en: "Corn Flakes", ur: "کارن فلیکس" },
      price: 280,
      description: {
        en: "Crispy corn flakes for a healthy breakfast.",
        ur: "صحت مند ناشتے کے لیے کرکرے کارن فلیکس۔",
      },
      category: "breakfastCereals",
      brand: { en: "Kellogg's", ur: "کیلاگز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
    },
    {
      id: 96,
      name: { en: "Oat Cereal", ur: "جئی کا سیریل" },
      price: 320,
      description: {
        en: "Wholesome oat cereal with honey.",
        ur: "شہد کے ساتھ صحت مند جئی کا سیریل۔",
      },
      category: "breakfastCereals",
      brand: { en: "Quaker", ur: "کویکر" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400",
    },
    {
      id: 97,
      name: { en: "Chocolate Cereal", ur: "چاکلیٹ سیریل" },
      price: 300,
      description: {
        en: "Chocolate-flavored cereal loved by kids.",
        ur: "چاکلیٹ کے ذائقے والا سیریل جو بچوں کو پسند ہے۔",
      },
      category: "breakfastCereals",
      brand: { en: "Nestle", ur: "نیسلے" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
    },
    {
      id: 98,
      name: { en: "Fruit Loops", ur: "فروٹ لوپس" },
      price: 290,
      description: {
        en: "Colorful fruit-flavored cereal rings.",
        ur: "رنگین پھلوں کے ذائقے والے سیریل رِنگز۔",
      },
      category: "breakfastCereals",
      brand: { en: "Kellogg's", ur: "کیلاگز" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
    },
    {
      id: 99,
      name: { en: "Granola", ur: "گرینولا" },
      price: 380,
      description: {
        en: "Crunchy granola with nuts and dried fruits.",
        ur: "گری دار میوے اور خشک میوے کے ساتھ کرنچی گرینولا۔",
      },
      category: "breakfastCereals",
      brand: { en: "Nature Valley", ur: "نیچر ویلی" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400",
    },
    {
      id: 100,
      name: { en: "Muesli", ur: "میوزلی" },
      price: 350,
      description: {
        en: "Healthy muesli mix with oats and fruits.",
        ur: "جئی اور پھلوں کے ساتھ صحت مند میوزلی مکس۔",
      },
      category: "breakfastCereals",
      brand: { en: "Alpen", ur: "الپن" },
      isAvailable: true,
      isNumerical: true,
      imageURL:
        "https://images.unsplash.com/photo-1571167090495-f503e27ae9d7?w=400",
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
