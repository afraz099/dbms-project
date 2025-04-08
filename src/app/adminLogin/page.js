"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      if (res.status === 200) {
        router.push("/admin");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Login</h1>
        
        {message && (
          <div style={styles.messageBox}>
            <p style={styles.messageText}>{message}</p>
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.primaryButton}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212",
    padding: "20px",
    paddingTop: "100px",
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    padding: "40px",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #333",
  },
  title: {
    color: "#d32f2f",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
    textAlign: "center",
  },
  messageBox: {
    backgroundColor: "#2a2a2a",
    padding: "16px",
    borderRadius: "6px",
    marginBottom: "24px",
    border: "1px solid #333",
  },
  messageText: {
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    margin: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
    "&:focus": {
      borderColor: "#d32f2f",
    }
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
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
    "&:disabled": {
      backgroundColor: "#444",
      cursor: "not-allowed",
    }
  },
};
