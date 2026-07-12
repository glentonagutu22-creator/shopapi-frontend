import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
 const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


  function addToCart(product) {
  const existingProduct = cart.find(
    (item) => item._id === product._id
  );

  if (existingProduct) {
    setCart(
      cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
}
function increaseQuantity(id) {
  setCart(
    cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

function decreaseQuantity(id) {
  setCart(
    cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

function removeFromCart(id) {
  setCart(cart.filter((item) => item._id !== id));
}
  return (
    <CartContext.Provider value={{ cart, addToCart,increaseQuantity,
      decreaseQuantity, removeFromCart,
     }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;