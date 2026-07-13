import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "/api/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration successful");

      navigate("/login");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <p className="subtitle">
          Join ShopSphere today
        </p>


        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />


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
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;