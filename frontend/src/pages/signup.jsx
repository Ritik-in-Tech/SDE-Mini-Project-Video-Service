import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL_AUTH_PROD, API_BASE_URL_VIDEO } from "../config";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${API_BASE_URL_AUTH_PROD}/api/v1/users/register`,
        formData
      );
      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setMessage(response.data.message || "User registered successfully!");
        navigate("/login");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Failed to register user");
      } else {
        setMessage("Network Error: Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p>Already have account? <a href="/login">Login</a></p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignupPage;
