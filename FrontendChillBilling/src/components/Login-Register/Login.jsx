import React, { useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import api from "../../api/api";
import logo from "../../assets/logo2.jpg";
import "./Login.css";
import { useLocation } from "react-router-dom";

const Login = () => {
  let userRef = useRef();
  let passwordRef = useRef();
  let navigate = useNavigate();

  //to get successMessage after registration
  const location = useLocation();
  const successMessage = location.state?.successMessage || null;

  async function login(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        identifier: userRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") {
        navigate("/admin-home");
      } else if (res.data.role === "ACCOUNTANT") {
        navigate("/accountant-home");
      } else if (res.data.role === "CUSTOMER") {
        navigate("/customer-home");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Invalid username or password");
    }
  }
  return (
    <>
      <nav className="navbar">
        <div>
          <img className="logo" src={logo} alt="logo not found" />
        </div>
        <div className="nav-links">
          <a href="/about">About Us</a>
          <span>|</span>
          <a href="/register" className="signup-btn">
            Sign up
          </a>
        </div>
      </nav>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="login-container">
        <h1>Welcome back</h1>

        <form onSubmit={login}>
          <label>Enter Email address or Username:</label>
          <input type="text" required ref={userRef} />
          <label>Enter Password:</label>
          <input type="password" required ref={passwordRef} />
          <div className="options">
            <a href="/forgot-password" className="forgot">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="create-account">
          Don’t have an account? <a href="/register">Create New Account</a>
        </p>
      </div>

      <footer>
        <p>© All copy rights are reserved to Chill Billing</p>
        <div className="contact">
          <span>📞 +91 9999999999</span>
          <span>📧 abc@gmail.com</span>
        </div>
      </footer>
      <Outlet />
    </>
  );
};

export default Login;
