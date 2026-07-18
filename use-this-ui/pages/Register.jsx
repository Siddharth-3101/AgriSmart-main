import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaMapMarkerAlt,
} from "react-icons/fa";

import bgVideo from "../assets/greenwhitevideo.mp4";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    state: "",
    district: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  toast.success("Registration Successful!");

  setTimeout(() => {
    navigate("/login");
  }, 2000);
   // Backend connection will be added later.
};

  return (
    <div className="login-page">
      {/* Background Video */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="logo-section">
          <FaLeaf className="leaf-icon" />

          <h1>Create Account</h1>

          <p>Join AgriSmart Today</p>
        </div>

        <form onSubmit={handleRegister}>
            <div className="register-grid">
          {/* Full Name */}

          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}

          <div className="input-box">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

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

          {/* Confirm Password */}

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Role */}

          <div className="input-box">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Platform Role</option>
              <option value="Farmer">Farmer</option>
              <option value="Agriculture Officer">
                Agriculture Officer
              </option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* State */}

          <div className="input-box">
            <FaMapMarkerAlt className="input-icon" />

            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          {/* District */}

          <div className="input-box">
            <FaMapMarkerAlt className="input-icon" />

            <input
              type="text"
              placeholder="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>
          </div>
          {/* Register Button */}

          <button className="login-btn">
            Register
          </button>

          <div className="register-text">
            Already have an account?

            <Link to="/login">
              Login
            </Link>
          </div>

        </form>
      </motion.div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Register;