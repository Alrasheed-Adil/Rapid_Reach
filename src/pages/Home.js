import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBullhorn , FaEnvelope , FaRobot , FaCheckCircle } from "react-icons/fa";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header
  className="text-white text-center py-5"
  style={{
    backgroundColor: "var(--gray-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem",
  }}
>
  <div className="container" style={{ flex: 1 }} data-aos="fade-down">
    <h1 style={{
      fontWeight: "bold",
       color: "var(--primary-color)",
      }} className="display-4">Welcome to Rapid Reach</h1>
    <p style={{
      color: "var(--secondary-color)",
      fontSize: "1.5rem",
      }} className="lead">Connect Smarter. Reach Further.</p>
    {loggedIn ? (
      <a href="/dashboard" className="btn btn-light btn-lg mt-3" style={{
        color: "var(--white-color)",
        fontWeight: "bold",
        backgroundColor: "var(--primary-color)",
        padding: "0.8rem 2rem",
        borderRadius: "30px",
        transition: "all 0.3s ease",
      }}>
        Go to Dashboard
      </a>
    ) : (
      <a href="/signup" className="btn btn-light btn-lg mt-3" style={{
        color: "var(--white-color)",
        fontWeight: "bold",
        backgroundColor: "var(--primary-color)",
        padding: "0.8rem 2rem",
        borderRadius: "30px",
        transition: "all 0.3s ease",
      }}>
        Get Started for Free
      </a>
    )}
  </div>
  <div className="hero-image" style={{ flex: 1 }}>
    <img
      src={require("../assets/hero_image.png")}
      alt="Hero Illustration"
      data-aos="fade-up"
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        animation: "float 3s ease-in-out infinite",
      }}
    />
  </div>
</header>




{/* Features Section */}
<section className="py-5 " style={{backgroundColor: "var(--primary-color)"}}>
  <div className="container" >
    <h2 className="text-center mb-4" data-aos="fade-up" style={{color: "var(--white-color)"}}>
      Our Features
    </h2>
    <div className="row gy-4" >
      {/* Feature 1: Automation of Sending Multiple Emails */}
      <div className="col-md-4" data-aos="zoom-in">
        <div
          className="feature-card text-center p-4 shadow-sm"
          style={{
            borderRadius: "12px",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <div
            className="icon-container mb-3"
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto",
              borderRadius: "50%",
              backgroundColor: "var(--primary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaEnvelope size={30} color="#fff" />
          </div>
          <h5 className="mb-2">Automated Email Sending</h5>
          <p className="text-muted">
            Send personalized emails to thousands of recipients in just a few clicks.
          </p>
        </div>
      </div>

      {/* Feature 2: High Reach */}
      <div className="col-md-4" data-aos="zoom-in">
        <div
          className="feature-card text-center p-4 shadow-sm"
          style={{
            borderRadius: "12px",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <div
            className="icon-container mb-3"
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto",
              borderRadius: "50%",
              backgroundColor: "var(--primary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaBullhorn size={30} color="#fff" />
          </div>
          <h5 className="mb-2">Expand Your Reach</h5>
          <p className="text-muted">
            Effortlessly connect with a large audience to amplify your campaigns.
          </p>
        </div>
      </div>

      {/* Feature 3: AI-Powered Email Creation */}
      <div className="col-md-4" data-aos="zoom-in">
        <div
          className="feature-card text-center p-4 shadow-sm"
          style={{
            borderRadius: "12px",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <div
            className="icon-container mb-3"
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto",
              borderRadius: "50%",
              backgroundColor: "var(--primary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaRobot size={30} color="#fff" />
          </div>
          <h5 className="mb-2">AI-Driven Email Creation</h5>
          <p className="text-muted">
            Use AI to craft professional and impactful email content in seconds.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* How It Works Section */}
      <section className="bg-light py-5">
  <div className="container">
    <h2 className="text-center mb-4" data-aos="fade-up">
      How It Works
    </h2>
    <div className="row position-relative">
      {/* Connector Line */}
      <div
        className="connector-line d-none d-md-block"
        style={{
          position: "absolute",
          top: "50%",
          left: "10%",
          width: "80%",
          height: "2px",
          background: "var(--primary-color)",
          zIndex: 1,
        }}
      ></div>

      {/* Step 1 */}
      <div
        className="col-md-4 text-center"
        data-aos="fade-right"
        style={{ zIndex: 2 }}
      >
        <div
          className="step-box p-4 shadow-sm"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <FaCheckCircle
            size={40}
            color="var(--primary-color)"
            className="mb-3"
          />
          <h5 className="mb-2">Step 1</h5>
          <p>Sign up and configure your email settings.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div
        className="col-md-4 text-center"
        data-aos="fade-up"
        style={{ zIndex: 2 }}
      >
        <div
          className="step-box p-4 shadow-sm"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <FaCheckCircle
            size={40}
            color="var(--primary-color)"
            className="mb-3"
          />
          <h5 className="mb-2">Step 2</h5>
          <p>Upload your recipient list and create your campaign.</p>
        </div>
      </div>

      {/* Step 3 */}
      <div
        className="col-md-4 text-center"
        data-aos="fade-left"
        style={{ zIndex: 2 }}
      >
        <div
          className="step-box p-4 shadow-sm"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <FaCheckCircle
            size={40}
            color="var(--primary-color)"
            className="mb-3"
          />
          <h5 className="mb-2">Step 3</h5>
          <p>Send emails and track analytics in real time.</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-4" data-aos="fade-up">Frequently Asked Questions</h2>
    <div className="accordion" id="faqAccordion" data-aos="fade-up">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            What is Rapid Reach?
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
          <div className="accordion-body">
            Rapid Reach is a platform designed to streamline email automation and analytics for businesses.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            How does it work?
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
          <div className="accordion-body">
            Sign up, upload your recipient list, and create campaigns with a few clicks.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

     {/* Call-to-Action Section */}
<section
  className="text-center py-5"
  style={{
    backgroundColor: "var(--primary-color)",
    color: "#fff", // Ensure good contrast with the background
  }}
>
  <div className="container" data-aos="fade-up">
    <h2 className="mb-4 display-5" style={{ fontWeight: "bold" ,color: "var(--white-color)"}}>
      Transform the Way You Connect
    </h2>
    <p className="lead mb-4" style={{ color: "var(--white-color)" }}>
      Experience the power of streamlined email communication with Rapid Reach. Simplify your workflow and maximize your reach today!
    </p>
    {loggedIn ? (
      <a
        href="/dashboard"
        className="btn btn-light btn-lg"
        style={{
          color: "var(--secondary-color)",
          fontWeight: "bold",
          padding: "0.8rem 2rem",
          borderRadius: "30px",
          transition: "all 0.3s ease",
        }}
        // onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
        // onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        Go to Dashboard
      </a>
    ) : (
      <a
        href="/signup"
        className="btn btn-light btn-lg"
        style={{
          color: "var(--secondary-color)",
          fontWeight: "bold",
          padding: "0.8rem 2rem",
          borderRadius: "30px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        Get Started Now
      </a>
    )}
  </div>
</section>


      <Footer />
    </div>
  );
}

export default Home;
