import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.jpg"; // use your existing logo
import "../Admin/AdminHome.css";

const CustomerHome = () => {
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div>
          <img className="logo" src={logo} alt="logo not found" />
        </div>
        <div className="nav-links">
          <a href="/about">About us</a>
          <span>|</span>
          
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      

      {/* Main Content */}
      <div className="admin-home-container">
        <div class="background"></div>
        <div className="content">
          <h2>Welcome to Chill Billing</h2>
          <p>
            A secure platform to view your invoices, payment history, and keep track of your outstanding payments. Stay updated on your billing details with ease.
          </p>
          <button className="go-dashboard-btn" onClick={()=> navigate("/customerdashboard")}>
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>© All copy rights are reserved to Chill Billing</p>
        <div className="seperator">
          <big><strong>Contact us :</strong></big>
        <div className="contact">
          <span>📞 +91 9999999999</span>
          <span>📧 abc@gmail.com</span>
        </div>
        </div>
      </footer>
    </>
  );
};

export default CustomerHome;
