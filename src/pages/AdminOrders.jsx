
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId, status) {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated successfully");

      fetchOrders();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    }
  }

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const paidOrders = orders.filter(
    (order) => order.status === "Paid"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  function getStatusStyles(status) {
    switch (status) {
      case "Paid":
        return "bg-blue-50 text-blue-700";

      case "Shipped":
        return "bg-purple-50 text-purple-700";

      case "Delivered":
        return "bg-green-50 text-green-700";

      case "Pending":
      default:
        return "bg-yellow-50 text-yellow-700";
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading orders...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            ShopSphere
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
            Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders and update their delivery status.
          </p>

        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {orders.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingOrders}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Paid / Shipped
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {paidOrders + shippedOrders}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Delivered
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {deliveredOrders}
            </p>
          </div>

        </div>

        {/* Orders */}
        {orders.length === 0 ? (

          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm ring-1 ring-gray-100">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              📦
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Customer orders will appear here once they are placed.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-mono text-sm font-medium text-gray-800">
                      {order._id}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Paid">
                        Paid
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>

                  </div>

                </div>

                {/* Order Content */}
                <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3">

                  {/* Customer */}
                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Customer
                    </p>

                    <div className="mt-3">

                      <p className="font-semibold text-gray-900">
                        {order.user?.name || "Unknown Customer"}
                      </p>

                      <p className="mt-1 break-all text-sm text-gray-500">
                        {order.user?.email || "No email available"}
                      </p>

                    </div>

                  </div>

                  {/* Products */}
                  <div className="lg:col-span-1">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Products
                    </p>

                    <div className="mt-3 space-y-2">

                      {order.items?.map((item) => (

                        <div
                          key={item._id}
                          className="rounded-xl bg-gray-50 px-4 py-3"
                        >

                          <div className="flex items-center justify-between gap-3">

                            <p className="text-sm font-medium text-gray-800">
                              {item.product
                                ? item.product.name
                                : "Product no longer available"}
                            </p>

                            <span className="shrink-0 text-sm font-semibold text-gray-600">
                              ×{item.quantity}
                            </span>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Total */}
                  <div className="rounded-xl bg-gray-50 p-5 lg:text-right">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Order Total
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      KSh{" "}
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString()}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.items?.length || 0} product item
                      {order.items?.length === 1 ? "" : "s"}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminOrders;

