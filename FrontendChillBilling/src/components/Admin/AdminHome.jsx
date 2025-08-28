import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.jpg"; // use your existing logo
import "./AdminHome.css";

const AdminHome = () => {
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
          <h2>Welcome to our Billing Application</h2>
          <p>
            A streamlined, secure, and scalable solution for managing invoices,
            payments, and customers. Whether you're a freelancer, a growing startup, 
            or an enterprise, our platform helps automate your billing processes, 
            reduce manual errors, and get paid faster.
          </p>
          <button className="go-dashboard-btn" onClick={()=> navigate("/admindashboard")}>
            Go to Dashboard
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer>
        <p>© All copy rights are reserved to Chill Billing</p>
        <div className="seperator">
          <big>Contact us :</big>
        <div className="contact">
          <span>📞 +91 9999999999</span>
          <span>📧 abc@gmail.com</span>
        </div>
        </div>
      </footer>
    </>
  );
};

export default AdminHome;
