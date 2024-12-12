import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaChartBar, FaCogs, FaServer, FaFileCsv } from "react-icons/fa";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {/* Welcome Section */}
        <div className="text-center mb-4">
          <h1>Welcome, User!</h1>
          <p className="lead">Manage your email campaigns and analytics all in one place.</p>
        </div>

        {/* Cards Section */}
        <div className="row gy-4">
          {/* Campaigns Card */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <FaEnvelope size={40} color="var(--primary-color)" className="mb-3" />
                <h5 className="card-title">Campaigns</h5>
                <p className="card-text">Create and manage your email campaigns effortlessly.</p>
                <a href="/campaigns" className="btn btn-primary">
                  View Campaigns
                </a>
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <FaChartBar size={40} color="var(--primary-color)" className="mb-3" />
                <h5 className="card-title">Analytics</h5>
                <p className="card-text">Track email opens, clicks, and other performance metrics.</p>
                <a href="/analytics" className="btn btn-primary">
                  View Analytics
                </a>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <FaCogs size={40} color="var(--primary-color)" className="mb-3" />
                <h5 className="card-title">Settings</h5>
                <p className="card-text">Customize your preferences and account settings.</p>
                <a href="/settings" className="btn btn-primary">
                  Go to Settings
                </a>
              </div>
            </div>
          </div>

          {/* SMTP Settings Card */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <FaServer size={40} color="var(--primary-color)" className="mb-3" />
                <h5 className="card-title">SMTP Settings</h5>
                <p className="card-text">Configure your email server for sending campaigns.</p>
                <a href="/smtp-settings" className="btn btn-primary">
                  Configure SMTP
                </a>
              </div>
            </div>
          </div>

          {/* Upload CSV Card */}
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <FaFileCsv size={40} color="var(--primary-color)" className="mb-3" />
                <h5 className="card-title">Upload CSV</h5>
                <p className="card-text">Upload recipient lists for your email campaigns.</p>
                <a href="/upload-csv" className="btn btn-primary">
                  Upload CSV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
