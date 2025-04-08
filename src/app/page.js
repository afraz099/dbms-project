"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [bloodType, setBloodType] = useState("");
  const [compatibleTypes, setCompatibleTypes] = useState([]);

  const bloodCompatibility = {
    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    "AB-": ["A-", "B-", "O-", "AB-"],
    "O+": ["O+", "O-"],
    "O-": ["O-"],
  };

  const checkCompatibility = () => {
    if (bloodType in bloodCompatibility) {
      setCompatibleTypes(bloodCompatibility[bloodType]);
    } else {
      setCompatibleTypes([]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Blood Bank Management System</h1>
        <p style={styles.subtitle}>Select your blood type to see compatible donors:</p>

        <div style={styles.formGroup}>
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Blood Type</option>
            {Object.keys(bloodCompatibility).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button onClick={checkCompatibility} style={styles.primaryButton}>
            Check Compatibility
          </button>
        </div>

        {compatibleTypes.length > 0 && (
          <div style={styles.resultBox}>
            <p style={styles.resultText}>Compatible Blood Types:</p>
            <p style={styles.bloodTypes}>{compatibleTypes.join(", ")}</p>
          </div>
        )}

        <div style={styles.buttonGroup}>
          <button onClick={() => router.push("/request")} style={styles.secondaryButton}>
            Request Blood
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212",
    padding: "20px",
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    border: "1px solid #333",
  },
  title: {
    color: "#d32f2f",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "16px",
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "16px",
    marginBottom: "24px",
    textAlign: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
  },
  select: {
    padding: "12px",
    border: "1px solid #444",
    borderRadius: "6px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#2a2a2a",
    outline: "none",
    transition: "border 0.3s",
  },
  primaryButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    padding: "14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#b71c1c",
    }
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#d32f2f",
    padding: "12px",
    border: "1px solid #d32f2f",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s",
    flex: 1,
    ":hover": {
      backgroundColor: "#d32f2f",
      color: "white",
    },
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  resultBox: {
    backgroundColor: "#2a2a2a",
    padding: "16px",
    borderRadius: "6px",
    marginBottom: "24px",
    border: "1px solid #333",
  },
  resultText: {
    color: "#aaa",
    fontSize: "14px",
    marginBottom: "8px",
  },
  bloodTypes: {
    color: "#ff5252",
    fontSize: "16px",
    fontWeight: "500",
  },
};

export default Home;