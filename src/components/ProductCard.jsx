import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";
import api from "../services/api";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  async function handleAddToCart() {
    try {
      const token = localStorage.getItem("token");

      console.log("Token:", token);
      console.log("Product ID:", product._id);

      const response = await api.post(
        "/api/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend Response:", response.data);

      // Update the frontend cart
      addToCart(product);

      alert("Product added successfully");
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Response:", error.response);

      alert(error.response?.data?.message || "Failed to add to cart");
    }
  }

  return (
    <div className="product-card">
      <img
        src={product.image || null}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <p><strong>Brand:</strong> {product.brand}</p>

      <p><strong>Category:</strong> {product.category}</p>

      <h2>KSh {product.price}</h2>

      <Link to={`/products/${product._id}`}>
        <button>View Product</button>
      </Link>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;