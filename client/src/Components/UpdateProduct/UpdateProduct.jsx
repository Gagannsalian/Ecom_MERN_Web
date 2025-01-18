import  { useState, useEffect } from 'react';
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
    image: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8082/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
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
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" className="submit-button">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
