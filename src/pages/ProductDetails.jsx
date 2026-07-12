import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function ProductDetails() {
     const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await api.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <img
        src={
          product.image ||
          "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={product.name}
        style={{
          width: "400px",
          borderRadius: "10px",
        }}
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>KSh {product.price}</h2>

      <p>
        <strong>Brand:</strong> {product.brand}
      </p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      
<button onClick={() => addToCart(product)}>
  Add to Cart
</button>
    </div>
  );
}

export default ProductDetails;