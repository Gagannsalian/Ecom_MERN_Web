import { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState(null); // New state for image
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !company || !image) {
      setError("All fields, including the image, are required!");
      return;
    }

    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id; // Retrieve the user's ID

      if (!userId) {
        setError("User not logged in.");
        return;
      }

      // Create form data for the image upload
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("company", company);
      formData.append("userId", userId);
      formData.append("image", image); // Add image file

      const response = await fetch("http://localhost:8082/add-product", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setImage(null); // Clear image
        setError("");
      } else {
        alert(result.error || "Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Handle file selection
          />
        </div>

        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
