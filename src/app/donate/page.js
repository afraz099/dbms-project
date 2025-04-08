"use client";
import { useState } from "react";
import axios from "axios";


export default function Donate() {
  const [donor, setDonor] = useState({
    name: "",
    bloodType: "",
    contact: "",
    location: "",
    email: "",
    password: "",
    isProvided: false,
  });

  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/donate", donor);
      alert("Donation recorded successfully!");
      setDonor({ 
        name: "", 
        bloodType: "", 
        contact: "", 
        location: "", 
        email: "", 
        password: "", 
        isProvided: false 
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting donation");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.textContent}>
          <h1 style={styles.title}>Donate Blood</h1>
          <p style={styles.subtitle}>Your donation can save up to 3 lives</p>
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Why Donate?</h3>
            <ul style={styles.benefitsList}>
              <li style={styles.benefitItem}>Every 2 seconds someone needs blood</li>
              <li style={styles.benefitItem}>Only 3% of eligible people donate annually</li>
              <li style={styles.benefitItem}>One donation can help multiple patients</li>
            </ul>
          </div>
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Requirements</h3>
            <ul style={styles.benefitsList}>
              <li style={styles.benefitItem}>Age 18-65 years</li>
              <li style={styles.benefitItem}>Weight at least 50kg</li>
              <li style={styles.benefitItem}>Good health condition</li>
            </ul>
          </div>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={donor.name} 
                onChange={handleChange} 
                style={styles.input}
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <select 
                name="bloodType" 
                value={donor.bloodType} 
                onChange={handleChange} 
                style={styles.select}
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <input 
                type="tel" 
                name="contact" 
                placeholder="Contact Number" 
                value={donor.contact} 
                onChange={handleChange} 
                style={styles.input}
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <input 
                type="text" 
                name="location" 
                placeholder="Location" 
                value={donor.location} 
                onChange={handleChange} 
                style={styles.input}
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={donor.email} 
                onChange={handleChange} 
                style={styles.input}
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={donor.password} 
                onChange={handleChange} 
                style={styles.input}
                required 
              />
            </div>

            <button type="submit" style={styles.primaryButton}>
              Submit Donation
            </button>

          
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "20px",
    paddingTop: "150px",
    color: "#fff",
    overflowX: "hidden", // Prevent horizontal scroll
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
  },
  benefitItem: {
    marginBottom: "0.8rem",
    position: "relative",
    paddingLeft: "25px",
  },
  benefitItem: {
    marginBottom: "0.8rem",
    position: "relative",
    paddingLeft: "25px",
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
  input: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "16px",
  },
  select: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "16px",
    appearance: "none",
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
  },
  loginText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#d32f2f",
    textDecoration: "none",
    fontWeight: "500",
  },
};