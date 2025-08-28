// src/pages/Welcome.jsx
import React from "react";
import "./AdminWelcome.css"

export default function AdminWelcome() {
  return (
    <>
    <div className="welcome-background"></div>
    <div style={{
        textAlign:"center", // align text left
        paddingTop: "180px",
      }}>
      <h2 style={{
        fontSize: "28px",
        color: "#263238",
        marginBottom: "22px",
        fontWeight: "700"
      }}>Welcome to the Admin Dashboard</h2>
      <p style={{
        fontSize: "19px",
        color: "#50707b"
      }}>
        Select a menu option from the left to begin managing the billing system.
      </p>
    </div>
    
    </>
  );
}
