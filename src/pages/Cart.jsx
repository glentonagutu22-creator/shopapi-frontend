import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { toast } from "react-toastify";

function Cart() {
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

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
      setOrderId(response.data.orderId);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Checkout failed"
      );
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
      toast.error(
        error.response?.data?.message || "Payment failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* Header */}
      <div className="mx-auto mb-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <p className="mt-2 text-gray-500">
          Review your items before placing your order.
        </p>
      </div>

      {cart.length === 0 ? (
        /* Empty cart */
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-6xl">
            🛒
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products to your cart to continue shopping.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">

            {cart.map((product) => (
              <div
                key={product._id}
                className="rounded-2xl bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex gap-4">

                  {/* Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-blue-600">
                      KSh {Number(product.price).toLocaleString()}
                    </p>

                    {/* Quantity */}
                    <div className="mt-4 flex items-center gap-3">

                      <button
                        onClick={() =>
                          decreaseQuantity(product._id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center font-semibold">
                        {product.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(product._id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-lg font-semibold text-white hover:bg-gray-800"
                      >
                        +
                      </button>

                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(product._id)
                      }
                      className="mt-3 text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>

                  {/* Subtotal */}
                  <div className="hidden text-right sm:block">
                    <p className="text-xs text-gray-400">
                      Subtotal
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      KSh{" "}
                      {(
                        product.price * product.quantity
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Mobile subtotal */}
                <div className="mt-4 flex items-center justify-between border-t pt-3 sm:hidden">
                  <span className="text-sm text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-bold text-gray-900">
                    KSh{" "}
                    {(
                      product.price * product.quantity
                    ).toLocaleString()}
                  </span>
                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-medium">
                  {cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  KSh {total.toLocaleString()}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    KSh {total.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>

            {/* Phone */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                M-Pesa Phone Number
              </label>

              <input
                type="text"
                placeholder="2547XXXXXXXX"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Checkout */}
            <div className="mt-5 space-y-3">

              <button
                onClick={handleCheckout}
                className="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Place Order
              </button>

              <button
                onClick={handlePayment}
                disabled={loading || !orderId}
                className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Sending STK..."
                  : "Pay with M-Pesa"}
              </button>

            </div>

            {!orderId && (
              <p className="mt-3 text-center text-xs text-gray-400">
                Place your order before making payment.
              </p>
            )}

          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;