import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

const { cart } = useContext(CartContext);
const navigate = useNavigate();

const token = localStorage.getItem("token");
const role = localStorage.getItem("role")?.toLowerCase();

const isAdmin = token && role === "admin";

function logout() {
localStorage.removeItem("token");
localStorage.removeItem("role");
setMenuOpen(false);
navigate("/login");
}

function closeMenu() {
setMenuOpen(false);
}

return ( <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">

```
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

    {/* Logo */}
    <Link
      to="/"
      onClick={closeMenu}
      className="text-2xl font-extrabold tracking-tight text-blue-600"
    >
      Shop<span className="text-slate-900">Sphere</span>
    </Link>


    {/* Desktop Navigation */}
    <div className="hidden items-center gap-6 md:flex">

      <Link
        to="/"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Home
      </Link>

      <Link
        to="/products"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Products
      </Link>

      <Link
        to="/cart"
        className="relative text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Cart

        {cart.length > 0 && (
          <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
            {cart.length}
          </span>
        )}
      </Link>


      {token ? (
        <>

          <Link
            to="/profile"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Profile
          </Link>


          {/* Admin Navigation */}
          {isAdmin && (
            <>
              <div className="h-6 w-px bg-slate-200" />

              <Link
                to="/admin"
                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Admin Dashboard
              </Link>

              <Link
                to="/admin/orders"
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                Orders
              </Link>
            </>
          )}


          <button
            onClick={logout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>

        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </>
      )}

    </div>


    {/* Mobile Menu Button */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="rounded-lg p-2 text-2xl text-slate-700 transition hover:bg-slate-100 md:hidden"
      aria-label="Toggle menu"
    >
      {menuOpen ? "✕" : "☰"}
    </button>

  </div>


  {/* Mobile Navigation */}
  {menuOpen && (
    <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden">

      <div className="flex flex-col gap-1">

        <Link
          to="/"
          onClick={closeMenu}
          className="rounded-lg px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
        >
          Home
        </Link>

        <Link
          to="/products"
          onClick={closeMenu}
          className="rounded-lg px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
        >
          Products
        </Link>

        <Link
          to="/cart"
          onClick={closeMenu}
          className="flex items-center justify-between rounded-lg px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
        >
          <span>Cart</span>

          {cart.length > 0 && (
            <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </Link>


        {token ? (
          <>

            <Link
              to="/profile"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Profile
            </Link>


            {/* Mobile Admin Navigation */}
            {isAdmin && (
              <div className="mt-2 border-t border-slate-200 pt-2">

                <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Administration
                </p>

                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-50 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-100"
                >
                  Admin Dashboard
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={closeMenu}
                  className="mt-1 block rounded-lg px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Manage Orders
                </Link>

              </div>
            )}


            <button
              onClick={logout}
              className="mt-3 rounded-lg bg-slate-900 px-4 py-3 text-left font-semibold text-white hover:bg-slate-700"
            >
              Logout
            </button>

          </>
        ) : (
          <>

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Register
            </Link>

          </>
        )}

      </div>

    </div>
  )}

</nav>


);
}

export default Navbar;
