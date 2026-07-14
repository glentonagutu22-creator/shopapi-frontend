import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

import api from "../services/api";
import { toast } from "react-toastify";

function Cart() {
    const [phone, setPhone] = useState("");
const [orderId, setOrderId] = useState("");
const [loading, setLoading] = useState(false);
async function handleCheckout() {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/api/orders/checkout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);

    // Save the order ID returned by the backend
    setOrderId(response.data.orderId);
    
  } catch (error) {
    console.log(error.response?.data);

    toast.error(error.response?.data?.message || "Checkout failed");
  }
}
async function handlePayment() {
  try {
    if (!orderId) {
      return toast.warning("Please place your order first.");
    }

    if (!phone) {
      return toast.warning("Please enter your M-Pesa phone number.");
    }

    setLoading(true);

    const response = await api.post("/api/mpesa/stkpush", {
      phone,
      amount: total,
      orderId,
    });

    toast.success(response.data.customerMessage);

  } catch (error) {
    console.log(error.response?.data);

    toast.error(error.response?.data?.message || "Payment failed.");
  } finally {
    setLoading(false);
  }
}
 const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = useContext(CartContext);
const total = cart.reduce(
  (sum, product) => sum + product.price * product.quantity,
  0
);
console.log("Current orderId state:", orderId);
 return (
  <div className="cart-container">
    <h1 className="cart-title">Shopping Cart</h1>

    {cart.length === 0 ? (
      <div className="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products to continue shopping.</p>
      </div>
    ) : (
      <>
        <div className="cart-items">
          {cart.map((product, index) => (
            <div className="cart-item" key={index}>
              <img
                src={product.image}
                alt={product.name}
                className="cart-image"
              />

              <div className="cart-details">
                <h3>{product.name}</h3>

                <p className="price">
                  KSh {product.price.toLocaleString()}
                </p>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(product._id)}
                  >
                    -
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(product._id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
              </div>

              <div className="subtotal">
                <strong>
                  KSh {(product.price * product.quantity).toLocaleString()}
                </strong>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Total: KSh {total.toLocaleString()}</h2>

          <input
            type="text"
            placeholder="2547XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={handleCheckout}>
            Place Order
          </button>

          <button
            onClick={handlePayment}
            disabled={loading || !orderId}
          >
            {loading ? "Sending STK..." : "Pay with M-Pesa"}
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default Cart;