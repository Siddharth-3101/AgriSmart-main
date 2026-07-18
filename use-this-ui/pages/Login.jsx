import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaLeaf, } from "react-icons/fa";
import bgVideo from "../assets/greenwhitevideo.mp4";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    navigate("/dashboard");
    
    // Backend integration will come later
  };

  return (
    <div className="login-page">
      {/* Background Video */}

      <video autoPlay muted loop playsInline className="background-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}

      <div className="overlay"></div>

      {/* Login Card */}

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="logo-section">
          <FaLeaf className="leaf-icon" />

          <h1>AgriSmart</h1>

          <p>Smart Farming Begins Here</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}

          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Remember */}

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              Remember Me
            </label>

            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}

          <button className="login-btn" type="submit">
            Login
          </button>

          {/* Register */}

          <div className="register-text">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;