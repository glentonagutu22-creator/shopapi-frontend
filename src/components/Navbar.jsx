import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar() {
    
const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav>
      <h2>ShopSphere</h2>
      <button
  className="menu-btn"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

      <div className={menuOpen ? "nav-links active" : "nav-links"}>
        <Link to="/admin">Admin</Link>
        <Link to="/admin/orders">
  Orders
</Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>


        <Link to="/cart" className="cart-link">
          Cart
          {cart.length > 0 && (
            <span className="cart-badge">
              {cart.length}
            </span>
          )}
        </Link>

        {token ? (
          <>
            <Link to="/profile">Profile</Link>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;