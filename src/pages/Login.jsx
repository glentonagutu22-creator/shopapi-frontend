import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [loading, setLoading] = useState(false);

function handleChange(e) {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
}

async function handleSubmit(e) {
e.preventDefault();
try {
  setLoading(true);

  const response = await api.post(
    "/api/auth/login",
    formData
  );

  console.log("LOGIN RESPONSE:", response.data);

  // Get the JWT token
  const token = response.data.token;

  // Decode the JWT payload
  const payload = JSON.parse(
    atob(token.split(".")[1])
  );

  // Get the user's role from the JWT
  const role = payload.role;

  console.log("USER ROLE:", role);

  // Save authentication information
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  toast.success("Login successful");

  navigate("/");

} catch (error) {
  console.log(
    error.response?.data || error.message
  );

  toast.error(
    error.response?.data?.message ||
    "Invalid email or password"
  );

} finally {
  setLoading(false);
}


}

return ( <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">

  <div className="w-full max-w-md">

    {/* Card */}
    <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

      {/* Header */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg">
          🛍️
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Login to your ShopSphere account
        </p>

      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Email */}
        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>


        {/* Password */}
        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </button>

          </div>

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>


        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>


      {/* Divider */}
      <div className="my-7 flex items-center gap-4">

        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-200" />

      </div>


      {/* Register */}
      <p className="text-center text-sm text-gray-500">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create one
        </Link>

      </p>

    </div>


    {/* Footer */}
    <p className="mt-6 text-center text-xs text-gray-400">
      ShopSphere · Quality devices at affordable prices
    </p>

  </div>

</div>


);
}

export default Login;
