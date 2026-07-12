import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

import api from "../services/api";

function Cart() {
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

    alert(response.data.message);

  } catch (error) {
  console.log(error.response.data);
  alert(error.response.data.message);
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
<button onClick={handleCheckout}>
  Place Order
</button>
    </div>
  );
}

export default Cart;