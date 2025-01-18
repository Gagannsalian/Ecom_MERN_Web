import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch('http://localhost:8082/products');
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let response = await fetch(`http://localhost:8082/product/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        alert("Product deleted successfully");
        getProducts();
      } else {
        alert(result.message || "Error deleting the product");
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="product-list-container">
      <h1 className="title">Product List</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img src={product.image || "default-image.png"} alt={product.name} />
              </div>
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>Price: ₹{product.price}</p>
                <p>Category: {product.category}</p>
                <p>Company: {product.company}</p>
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => handleUpdate(product._id)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
