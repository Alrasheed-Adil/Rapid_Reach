import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Papa from "papaparse";
import { FaFileUpload, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import {  getRequest ,postRequest , postRequestSmtp ,deleteRequest } from "../../utils/api"; // Import your API utility for making requests

function UploadCSV() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Parse, validate, and save the CSV
  const parseCSV = async () => {
    if (!file) {
      setErrorMessage("Please select a CSV file.");
      return;
    }

    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data;

        const requiredColumns = ["name", "email"];
        const missingColumns = requiredColumns.filter(
          (col) => !results.meta.fields.includes(col)
        );

        if (missingColumns.length > 0) {
          setErrorMessage(`Missing required columns: ${missingColumns.join(", ")}`);
          setLoading(false);
          return;
        }

        const invalidRows = rows.filter(
          (row) => !row.email || !/\S+@\S+\.\S+/.test(row.email)
        );

        if (invalidRows.length > 0) {
          setErrorMessage("Some rows have invalid or missing email addresses.");
          setLoading(false);
          return;
        }

        setData(rows);
        setSuccessMessage("CSV file parsed successfully!");
        await deleteRequest("/csv/clear");

        // Save the validated CSV to the database
        try {
           // Replace with your API endpoint
          // setSuccessMessage("CSV validated and saved successfully!");
          await postRequestSmtp("/csv/save", { csvData: rows }); // Replace with your API endpoint
          setSuccessMessage("CSV validated and saved successfully!");
        } catch (error) {
          console.error("Error saving CSV:", error);
          setErrorMessage("CSV validation succeeded, but saving failed. Please try again.");
        }

        setLoading(false);
      },
      error: (error) => {
        setErrorMessage("Failed to parse CSV file. Please try again.");
        console.error("Parsing error:", error);
        setLoading(false);
      },
    });
  };

  // Save parsed data to local storage and navigate to Send Email page
  const handleContinue = () => {
    if (data.length === 0) {
      setErrorMessage("Please validate the CSV file before continuing.");
      return;
    }

    localStorage.setItem("uploadedCsvData", JSON.stringify(data));
    navigate("/send");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Upload CSV</h1>
        <p className="text-center text-muted">Upload your recipient list to get started.</p>
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
                <form>
                  <div className="form-group mb-3">
                    <label>Select CSV File</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".csv"
                      onChange={handleFileUpload}
                      required
                    />
                  </div>
                </form>

                {/* Buttons Section */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary d-flex align-items-center justify-content-center"
                    style={{ flex: 1, marginRight: "0.5rem" }}
                    onClick={parseCSV}
                    disabled={loading}
                  >
                    <FaFileUpload className="me-2" />
                    {loading ? "Validating..." : "Validate CSV"}
                  </button>
                  <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    style={{ flex: 1, marginLeft: "0.5rem", backgroundColor: "var(--secondary-color)" }}
                    onClick={handleContinue}
                    disabled={data.length === 0}
                  >
                    <FaArrowRight className="me-2" />
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {data.length > 0 && (
          <div className="mt-5">
            <h2 className="text-center">Preview Data</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th style={{ backgroundColor: "var(--secondary-color)", color: "white" }} key={key}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UploadCSV;
