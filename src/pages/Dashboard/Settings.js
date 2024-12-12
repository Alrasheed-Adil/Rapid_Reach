import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { putRequest } from "../../utils/api"; // Use the PUT request utility

function Settings() {
  const [name, setName] = useState(""); // Assume dynamic name fetching
  const [email, setEmail] = useState(""); // Assume dynamic email fetching
  const [currentPassword, setCurrentPassword] = useState(""); // Added for current password
  const [newPassword, setNewPassword] = useState(""); // For new password
  const [confirmPassword, setConfirmPassword] = useState(""); // For password confirmation
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state for the form

  const handlePasswordUpdate = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true); // Start the loader

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Call the backend API to change the password
      const response = await putRequest("/users/change-password", {
        currentPassword,
        newPassword,
      });

      // Display success message
      setSuccessMessage(response.message || "Password updated successfully!");
      // Clear the form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      // Display error message from the backend
      setErrorMessage(err.message || "Failed to update password. Please try again.");
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Settings</h1>
        {/* Display success or error messages */}
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
        <div className="row">
          {/* Profile Section */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Profile Settings</h3>
                <form>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled>
                    Update Profile (Not Implemented)
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Change Password</h3>
                <form onSubmit={handlePasswordUpdate}>
                  <div className="form-group mb-3">
                    <label>Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter a new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Updating Password..." : "Update Password"}
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

export default Settings;
