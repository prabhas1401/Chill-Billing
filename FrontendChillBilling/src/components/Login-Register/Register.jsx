import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import logo from "../../assets/logo2.jpg";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validate form
  const validate = () => {
    if (!form.fullName.trim()) return "Full Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return "Enter a valid email";
    if (!form.phoneNumber.match(/^[6-9]\d{9}$/))
      return "Enter a valid 10-digit phone number starting with 6-9";
    if (!form.username.trim()) return "Username is required";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);

      localStorage.setItem(
        "successMessage",
        "Registration is successful, please check your mail for verification link"
      );
      navigate("/",{
  state: { successMessage: "Registration successful! Please check your email for verification link." },
});
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Navbar */}
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="navbar-right">
          <button className="nav-btn login" onClick={() => navigate("/")}>
            Login
          </button>
        </div>
      </div>

      {/* Form + Left text */}
      <div className="form-container">
        {/* Left Side Text */}
        <div className="register-left">
          <div className="reg-text">
            <div className="line1">
              <span className="registe-word">registe</span>
              <span className="big-r">R</span>
            </div>
            <div className="line2">
              <span className="text1">you</span>
              <span className="text2">self</span>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          <label>Full Name :</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <label>Email id :</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Phone number :</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phone}
            onChange={handleChange}
          />

          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <label>Enter Password :</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label>Retype Password :</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {/* Footer */}
      <div className="footer">
        <span>© All copy rights are reserved to Chill Billing</span>
        <span>Contact us : 📞 +91 9999999999 | 📧 abc@gmail.com</span>
      </div>
    </div>
  );
};

export default Register;
