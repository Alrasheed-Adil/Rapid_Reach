import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Dashboard/Settings";
import SMTPSettings from "./pages/Dashboard/SmtpSettings";
import UploadCSV from "./pages/Dashboard/UploadCsv";
import Analytics from "./pages/Dashboard/Analytics";
import SendEmail from "./pages/Dashboard/SendEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/smtp-settings" element={<SMTPSettings />} />
        <Route path="/upload-csv" element={<UploadCSV />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/send" element={<SendEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
