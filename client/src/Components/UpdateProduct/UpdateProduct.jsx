import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProduct.css';

const UpdateProduct = () => {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    company: '',
  });
  const [image, setImage] = useState(null); // Separate state for the image file

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      let response = await fetch(`http://localhost:8082/product/${id}`);
      let result = await response.json();
      setProduct(result);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all product details
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await fetch(`http://localhost:8082/product/${id}`, {
        method: 'PUT',
        body: formData, // Send as multipart/form-data
      });
      if (response.ok) {
        alert('Product updated successfully!');
        navigate('/');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="update-product-container">
      <h1>Update Product</h1>
      <form className="update-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            placeholder="Enter product category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={product.company}
            onChange={handleInputChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-button">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
