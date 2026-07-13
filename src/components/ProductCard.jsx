import { Link } from "react-router-dom";
import { useContext } from "react";
import noImage from "../assets/no-image.png";

import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

import api from "../services/api";
import { toast } from "react-toastify";


function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);


  async function handleAddToCart() {

    try {

      const token = localStorage.getItem("token");


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


      console.log(response.data);


      addToCart(product);

      toast.success("Product added successfully");


    } catch (error) {

      console.log(error.response);


      toast.error(
        error.response?.data?.message ||
        "Failed to add to cart"
      );

    }

  }


  return (

    <div className="product-card">


      <div className="image-container">
<img
  src={product.image || noImage}
  alt={product.name}
  className="product-image"
/>

      </div>



      <div className="product-content">


        <h3>{product.name}</h3>


        <p className="description">
          {product.description}
        </p>


        <p>
          <strong>Brand:</strong> {product.brand}
        </p>


        <p>
          <strong>Category:</strong> {product.category}
        </p>


        <h2 className="price">
          KSh {product.price}
        </h2>



        <div className="product-actions">


          <Link to={`/products/${product._id}`}>

            <button className="view-btn">
              View Product
            </button>

          </Link>



          <button
            className="cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>


        </div>


      </div>


    </div>

  );

}


export default ProductCard;