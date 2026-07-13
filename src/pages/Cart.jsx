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
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product, index) => (
          <div className="cart-item" key={index}>
            <h3>{product.name}</h3>
           <p>KSh {product.price}</p>

<p>
  <strong>Quantity:</strong> {product.quantity}
</p>

<button className="qty-btn" onClick={() => decreaseQuantity(product._id)}>
  -
</button>

<button className="qty-btn" onClick={() => increaseQuantity(product._id)}>
  +
</button>

<button className="remove-btn" onClick={() => removeFromCart(product._id)}>
  Remove
</button>


<hr />

            <hr />
          </div>
        ))
      )}
      <h2>
  Total: KSh {total}
</h2>
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
  );
}

export default Cart;