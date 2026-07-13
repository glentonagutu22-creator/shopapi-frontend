import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      alert("Login successful");

      navigate("/");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to your ShopSphere account
        </p>


        <form onSubmit={handleSubmit}>

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />


          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />


          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;