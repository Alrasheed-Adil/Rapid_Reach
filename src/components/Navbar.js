import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaUserPlus, FaTachometerAlt, FaSignOutAlt, FaUserCircle, FaPaperPlane } from "react-icons/fa";
import logo from "../assets/logo.png";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    // Check login status using token or API call
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Set to true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setLoggedIn(false); // Update state
    alert("Logged out successfully!");
    window.location.href = "/"; // Redirect to home
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
      style={{
        backgroundColor: "var(--secondary-color)",
        padding: "1.5rem 2rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Montserrat', sans-serif",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        {/* Logo and Brand */}
        <a
          className="navbar-brand d-flex align-items-center"
          href="/"
          style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          <img
            src={logo}
            alt="Rapid Reach Logo"
            style={{
              height: "40px",
              marginRight: "10px",
            }}
          />
          <span className="text-white fs-3">Rapid Reach</span>
        </a>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            backgroundColor: "var(--primary-color)",
            border: "none",
            padding: "0.5rem",
          }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5 mx-2"
                    href="/smtp-settings"
                    style={{
                      padding: "0.8rem 1.2rem",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <FaPaperPlane className="me-1" />
                    Start Sending
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5 mx-2"
                    href="/dashboard"
                    style={{
                      padding: "0.8rem 1.2rem",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <FaTachometerAlt className="me-1" />
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5 mx-2"
                    href="/settings"
                    style={{
                      padding: "0.8rem 1.2rem",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <FaUserCircle className="me-1" />
                    Account
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5 mx-2"
                    href="/"
                    onClick={handleLogout}
                    style={{
                      padding: "0.8rem 1.2rem",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <FaSignOutAlt />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5 mx-2"
                    href="/login"
                    style={{
                      padding: "0.8rem 1.2rem",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <FaSignInAlt className="me-1" />
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5 mx-2"
                    href="/signup"
                    style={{
                      padding: "0.8rem 1.2rem",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <FaUserPlus className="me-1" />
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
