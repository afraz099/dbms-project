"use client";
import { useState } from "react";
import axios from "axios";

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    contact: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.bloodType || !formData.contact || !formData.reason) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/request", formData);
      alert("Blood request submitted successfully! We will get back to you asap.");
      setFormData({ name: "", bloodType: "", contact: "", reason: "" });
    } catch (error) {
      alert("Error submitting request.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.textContent}>
          <h1 style={styles.title}>Request Blood</h1>
          <p style={styles.subtitle}>Your request helps us match donors with those in need</p>
          
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>How It Works</h3>
            <ul style={styles.benefitsList}>
              <li style={styles.benefitItem}>Submit your blood request details</li>
              <li style={styles.benefitItem}>Our system matches you with compatible donors</li>
              <li style={styles.benefitItem}>You'll be contacted within 24 hours</li>
            </ul>
          </div>
          
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Emergency Contacts</h3>
            <ul style={styles.benefitsList}>
              <li style={styles.benefitItem}>24/7 Helpline: +1 (800) 555-HELP</li>
              <li style={styles.benefitItem}>Emergency cases prioritized</li>
              <li style={styles.benefitItem}>Hospital partnerships available</li>
            </ul>
          </div>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Blood Type</label>
              <select 
                name="bloodType" 
                value={formData.bloodType} 
                onChange={handleChange} 
                style={styles.select}
                required
              >
                <option value="">Select Blood Type</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Reason for Request</label>
              <textarea
                name="reason"
                placeholder="Please provide details about why you need blood"
                value={formData.reason}
                onChange={handleChange}
                style={styles.textarea}
                required
              ></textarea>
            </div>

            <button type="submit" style={styles.primaryButton}>
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "20px",
    paddingTop: "100px",
    color: "#fff",
    overflowX: "hidden",
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  contentWrapper: {
    display: "flex",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "40px",
  },
  textContent: {
    flex: 1,
    paddingRight: "20px",
  },
  formContainer: {
    flex: 1,
    position: "relative",
    paddingLeft: "20px",
  },
  title: {
    color: "#d32f2f",
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  infoSection: {
    marginBottom: "2rem",
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  infoTitle: {
    color: "#d32f2f",
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  benefitsList: {
    paddingLeft: "20px",
    listStyleType: "none",
  },
  benefitItem: {
    marginBottom: "0.8rem",
    position: "relative",
    paddingLeft: "25px",
    color: "#ddd",
    "&::before": {
      content: "'•'",
      color: "#d32f2f",
      position: "absolute",
      left: "0",
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: "100px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
  },
  select: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "16px",
    appearance: "none",
    outline: "none",
  },
  textarea: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "16px",
    minHeight: "120px",
    resize: "vertical",
    outline: "none",
    transition: "border 0.3s",
  },
  primaryButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    padding: "16px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#b71c1c",
    }
  },
};

export default RequestBlood;