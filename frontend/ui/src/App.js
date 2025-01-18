import React, { useState } from "react";
import axios from "axios";

const PhishingDetectionApp = () => {
  const [emailContent, setEmailContent] = useState("");
  const [result, setResult] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/detect", {
        email: emailContent,
      });

      setResult(response.data.result);
    } catch (error) {
      console.error("Error detecting phishing email:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle at 30% 30%, #2e0352, #050013 90%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background light pattern */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 50%),
            radial-gradient(circle, rgba(255,0,255,0.1) 1%, transparent 40%)
          `,
          backgroundSize: "200px 200px",
          backgroundBlendMode: "overlay",
          opacity: 0.3,
          zIndex: 0,
        }}
      ></div>

      {/* Main content */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
          zIndex: 1,
          width: "80%",
          maxWidth: "600px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Phishing Email Detection
        </h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <textarea
            rows="10"
            cols="50"
            placeholder="Enter email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "15px",
              fontSize: "16px",
              fontFamily: "inherit",
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#888",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Detect
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <strong>Result:</strong> The email is classified as{" "}
            <span
              style={{
                color: result === "unsafe" ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {result}
            </span>
          </div>
        )}

        {/* Feedback and Info Buttons */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => alert("Thank you for your feedback!")}
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              fontSize: "14px",
              backgroundColor: "#444",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Feedback
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            style={{
              padding: "10px 15px",
              fontSize: "14px",
              backgroundColor: "#444",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showInfo ? "Close Info" : "What is this?"}
          </button>
        </div>

        {showInfo && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            This app helps detect phishing emails by analyzing their content.
            Paste the email content in the text box above and click "Detect" to
            see if the email is safe or unsafe.
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishingDetectionApp;
