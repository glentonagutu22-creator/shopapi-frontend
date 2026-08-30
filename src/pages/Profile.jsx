import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
        toast.error(
          error.response?.data?.message ||
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-gray-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const displayName = user.name || "ShopSphere Customer";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your ShopSphere account.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 sm:h-40" />

          {/* Profile content */}
          <div className="px-5 pb-8 sm:px-8">

            {/* Avatar */}
            <div className="-mt-12 flex flex-col sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-end">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-2xl font-bold text-blue-700 shadow-md sm:h-28 sm:w-28 sm:text-3xl">
                  {initials}
                </div>

              </div>

              <Link
                to="/"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:mt-0"
              >
                Continue Shopping
              </Link>

            </div>

            {/* Name */}
            <div className="mt-5">

              <h2 className="text-2xl font-bold text-gray-900">
                {displayName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                ShopSphere Customer
              </p>

            </div>

            {/* Information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {/* Email */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Email Address
                </p>

                <p className="mt-2 break-all font-medium text-gray-900">
                  {user.email}
                </p>

              </div>

              {/* Account */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Account Status
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="font-medium text-gray-900">
                    Active
                  </span>

                </div>

              </div>

            </div>

            {/* Account Actions */}
            <div className="mt-8 border-t border-gray-200 pt-8">

              <h3 className="text-lg font-semibold text-gray-900">
                Account
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <Link
                  to="/products"
                  className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-semibold text-gray-900">
                    Browse Products
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore our latest devices and electronics.
                  </p>
                </Link>

                <Link
                  to="/cart"
                  className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-semibold text-gray-900">
                    Shopping Cart
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    View your selected products and checkout.
                  </p>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;