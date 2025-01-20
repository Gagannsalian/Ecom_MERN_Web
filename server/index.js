const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("./Database/config");
const User = require("./Database/User");
const Product = require("./Database/product");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});
const upload = multer({ storage });

// Register Route
app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error registering user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      let user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      }).select("-password");

      if (user) {
        res.send(user);
      } else {
        res.status(400).send({ result: "No user found" });
      }
    } else {
      res.status(400).send({ result: "Email and password are required" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error logging in" });
  }
});

// Add Product with Image
app.post("/add-product", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No image file uploaded" });
  }

  try {
    const { name, price, category, company } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const product = new Product({ name, price, category, company, imageUrl });
    const result = await product.save();

    res.status(201).send({ message: "Product added successfully", product: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding product", error });
  }
});

// Get All Products
app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ results: "No products found" });
  }
});

// Delete Product
app.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Product deleted successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting product", error });
  }
});

// Update Product
app.put("/product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).send({ message: "Product updated successfully", data: updatedProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error });
  }
});

// Get Product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error });
  }
});

// Search Products
app.get("/search/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const products = await Product.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { category: { $regex: key, $options: "i" } },
        { company: { $regex: key, $options: "i" } },
      ],
    });

    if (products.length > 0) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error searching products", error });
  }
});

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
