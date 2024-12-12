import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { postRequestSmtp, generateEmailWithAI } from "../../utils/api";
import { FaMagic, FaEye, FaPaperPlane } from "react-icons/fa"; // Same icons as navigation

function SendEmail() {
  const [csvData, setCsvData] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false); // Loading state for sending emails

  // Load the CSV data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("uploadedCsvData");
    if (savedData) {
      setCsvData(JSON.parse(savedData));
    } else {
      setErrorMessage("No uploaded CSV data found. Please upload a CSV first.");
    }
  }, []);

  // Generate preview for the first recipient
  const handlePreview = () => {
    if (csvData.length > 0) {
      const sampleRecipient = csvData[0];
      let previewContent = body;
      Object.keys(sampleRecipient).forEach((key) => {
        const placeholder = `{{${key}}}`;
        previewContent = previewContent.replace(
          new RegExp(placeholder, "g"),
          sampleRecipient[key] || ""
        );
      });
      setPreview(previewContent);
    } else {
      setPreview("No recipient data available for preview.");
    }
  };

  // Handle email sending
  const handleSendEmails = async () => {
    try {
      setLoadingSend(true); // Set loading state
      setErrorMessage("");
      setSuccessMessage("");

      await postRequestSmtp("/smtp/send-bulk", { subject, body });

      setSuccessMessage("Emails sent successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending emails:", error);
      setErrorMessage("Failed to send emails. Please try again.");
    } finally {
      setLoadingSend(false); // Reset loading state
    }
  };

  // Generate email using AI API
  const handleGenerateEmail = async () => {
    if (!aiPrompt) {
      setErrorMessage("Please provide a prompt for email generation.");
      return;
    }
    try {
      setLoadingAI(true);
      setErrorMessage("");
      setSuccessMessage("");

      const generatedEmail = await generateEmailWithAI(aiPrompt);
      const subjectMatch = generatedEmail.match(/^Subject:\s*(.*)$/m);
      const extractedSubject = subjectMatch ? subjectMatch[1].trim() : "";
      const bodyContent = generatedEmail.replace(/^Subject:.*$/m, "").trim();

      setSubject(extractedSubject);
      setBody(bodyContent);
      setSuccessMessage("Email generated successfully! You can edit it further.");
    } catch (error) {
      console.error("Error generating email:", error);
      setErrorMessage("Failed to generate email. Please try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Send Emails</h1>
        <p className="text-center text-muted">Prepare and send bulk emails efficiently.</p>
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
                <div className="form-group mb-3">
                  <label>Email Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email Body</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Use placeholders like {{name}}"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>AI Prompt for Email Generation</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe the email you want to generate"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  ></textarea>
                </div>

                {/* Buttons Section */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary d-flex align-items-center justify-content-center"
                    style={{ flex: 1, marginRight: "0.5rem", backgroundColor: "var(--secondary-color)" }}
                    onClick={handleGenerateEmail}
                    disabled={loadingAI}
                  >
                    <FaMagic className="me-2" />
                    {loadingAI ? "Generating..." : "Generate with AI"}
                  </button>
                  <button
                    className="btn btn-secondary d-flex align-items-center justify-content-center"
                    style={{ flex: 1, margin: "0 0.5rem", backgroundColor: "black" }}
                    onClick={handlePreview}
                  >
                    <FaEye className="me-2" />
                    Preview
                  </button>
                  <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    style={{ flex: 1, marginLeft: "0.5rem" }}
                    onClick={handleSendEmails}
                    disabled={loadingSend} // Disable button during loading
                  >
                    <FaPaperPlane className="me-2" />
                    {loadingSend ? "Sending..." : "Send"}
                  </button>
                </div>

                {preview && (
                  <div className="alert alert-info mt-4" role="alert">
                    <strong>Email Preview:</strong>
                    <p>{preview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SendEmail;
