const express = require("express");
const cors = require("cors");

require("./Database/config");
const User = require("./Database/User");
const Product = require("./Database/product");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Register Route
app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save(); // Change const to let
    result = result.toObject(); // Reassigning the result object
    delete result.password; // Don't send the password
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
      // Ensure both email and password are provided
      let user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      }).select("-password");

      if (user) {
        res.send(user); // Send user data (excluding password)
      } else {
        res.status(400).send({ result: "No user found" }); // Return error if user is not found
      }
    } else {
      res.status(400).send({ result: "Email and password are required" }); // Handle missing fields
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error logging in" });
  }
});


//===================Adding Products======================

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});


//======================Getting or Extracting Products=====================

app.get("/products", async (req, res) => {
  let products = await Product.find();

  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ results: "no products found" });
  }
});

// ==================Delete Product==========================
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
// ==================Update Product==========================
app.put("/product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, // Product ID from the URL
      req.body, // Data to update
      { new: true } // Return the updated document
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

// ==================Get Product by ID==========================
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by ID
    if (product) {
      res.status(200).send(product); // Send product details
    } else {
      res.status(404).send({ message: "Product not found" }); // Handle not found
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error }); // Handle errors
  }
});


const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server Running in PORT : ${PORT}`);
});
