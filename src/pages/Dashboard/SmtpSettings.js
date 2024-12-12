import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getRequest, postRequest, postRequestSmtp } from "../../utils/api";
import { useNavigate } from "react-router-dom"; // For navigation

function SMTPSettings() {
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState(587); // Default SMTP port
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Navigation hook

  // Fetch existing SMTP settings on page load
  useEffect(() => {
    const fetchSMTPSettings = async () => {
      try {
        const response = await getRequest("/smtp");
        setSmtpHost(response.host);
        setSmtpPort(response.port);
        setEmail(response.email);
      } catch (error) {
        console.error("Failed to fetch SMTP settings:", error);
        setErrorMessage("Failed to load SMTP settings.");
      }
    };
    fetchSMTPSettings();
  }, []);

  // Save or update SMTP settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await postRequestSmtp("/smtp", {
        host: smtpHost,
        port: smtpPort,
        email,
        password,
      });
      setSuccessMessage("SMTP settings saved successfully!");
      setPassword(""); // Clear the password field
    } catch (error) {
      console.error("Failed to save SMTP settings:", error);
      setErrorMessage("Failed to save SMTP settings. Please try again.");
    }
  };

  // Handle navigation to the CSV upload page
  const handleNext = () => {
    navigate("/upload-csv");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">SMTP Settings</h1>
        <p className="text-center text-muted mb-4">
          Enter your SMTP settings below to start sending emails.
        </p>
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleSaveSettings}>
                  <div className="form-group mb-3">
                    <label>SMTP Host</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., smtp.gmail.com"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>SMTP Port</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g., 587"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="e.g., your-email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your email password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Save Settings
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SMTPSettings;