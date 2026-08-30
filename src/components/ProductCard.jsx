import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

import noImage from "../assets/no-image.png";
import api from "../services/api";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  async function handleAddToCart() {
    try {
      const token = localStorage.getItem("token");

      await api.post(
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

      addToCart(product);

      toast.success("Product added to cart");
    } catch (error) {
      console.log(error.response);

      toast.error(
        error.response?.data?.message ||
          "Failed to add to cart"
      );
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <Link
        to={`/products/${product._id}`}
        className="relative block overflow-hidden bg-slate-100"
      >
        <div className="flex h-64 items-center justify-center p-5">
          <img
            src={product.image || noImage}
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Category badge */}
        {product.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            {product.category}
          </span>
        )}
      </Link>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Brand */}
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {product.brand}
          </p>
        )}

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        )}

        {/* Price + Stock */}
        <div className="mt-auto pt-5">

          <div className="flex items-end justify-between gap-3">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Price
              </p>

              <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                KSh {Number(product.price).toLocaleString()}
              </p>
            </div>

            {product.stock !== undefined && (
              <span
                className={`text-xs font-semibold ${
                  product.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            )}

          </div>

          {/* Actions */}
          <div className="mt-5 grid grid-cols-2 gap-3">

            <Link
              to={`/products/${product._id}`}
              className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              View
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {product.stock === 0 ? "Unavailable" : "Add to Cart"}
            </button>

          </div>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;