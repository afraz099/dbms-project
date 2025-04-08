"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/admin/dashboard");
      setRequests(res.data.requests);
      setInventory(res.data.inventory);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }

  async function approveRequest(bloodType) {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/admin/assign", { bloodType });
      setMessage(res.data.message);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error assigning blood:", error);
      setMessage(error.response?.data?.message || "Failed to approve request.");
    } finally {
      setIsLoading(false);
    }
  }

  function getStock(bloodType) {
    const stock = inventory.find((item) => item.bloodType === bloodType);
    return stock ? stock.stock : 0;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        
        {message && (
          <div style={styles.messageBox}>
            <p style={styles.messageText}>{message}</p>
          </div>
        )}

        <div style={styles.columnsContainer}>
          {/* Requests Section */}
          <div style={styles.column}>
            <h2 style={styles.sectionTitle}>Blood Requests</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Blood Type</th>
                    <th style={styles.tableHeader}>Request Count</th>
                    <th style={styles.tableHeader}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(({ bloodType, count }) => {
                    const stock = getStock(bloodType);
                    const canApprove = count > 0 && stock > 0;
                    return (
                      <tr key={bloodType} style={styles.tableRow}>
                        <td style={styles.tableCell}>{bloodType}</td>
                        <td style={styles.tableCell}>{count}</td>
                        <td style={styles.tableCell}>
                          <button
                            style={canApprove ? styles.actionButton : styles.disabledButton}
                            onClick={() => canApprove && approveRequest(bloodType)}
                            disabled={!canApprove || isLoading}
                          >
                            {isLoading ? "Processing..." : "Approve"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Section */}
          <div style={styles.column}>
            <h2 style={styles.sectionTitle}>Blood Inventory</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Blood Type</th>
                    <th style={styles.tableHeader}>Available Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(({ bloodType, stock }) => (
                    <tr key={bloodType} style={styles.tableRow}>
                      <td style={styles.tableCell}>{bloodType}</td>
                      <td style={{
                        ...styles.tableCell,
                        color: stock > 0 ? '#6bff6b' : '#ff6b6b',
                        fontWeight: stock > 0 ? 'bold' : 'normal'
                      }}>
                        {stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
    paddingTop: "40px",  // Add this line to create space below navbar
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    padding: "30px",
    width: "100%",
    maxWidth: "1200px",
    border: "1px solid #333",
  },
  columnsContainer: {
    display: "flex",
    gap: "30px",
  },
  column: {
    flex: 1,
    minWidth: "0", // Prevents overflow
  },
  title: {
    color: "#d32f2f",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
    textAlign: "center",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    color: "#d32f2f",
    fontSize: "20px",
    marginBottom: "16px",
    borderBottom: "1px solid #444",
    paddingBottom: "8px",
  },
  messageBox: {
    backgroundColor: "#2a2a2a",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #333",
  },
  messageText: {
    color: "#fff",
    fontSize: "14px",
    textAlign: "center",
    margin: "0",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#fff",
  },
  tableHeaderRow: {
    backgroundColor: "#2a2a2a",
  },
  tableHeader: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #444",
    fontWeight: "600",
  },
  tableRow: {
    borderBottom: "1px solid #444",
    "&:hover": {
      backgroundColor: "#2a2a2a",
    }
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
  },
  actionButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    }
  },
  disabledButton: {
    backgroundColor: "#444",
    color: "#888",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    fontSize: "14px",
    fontWeight: "500",
  },
};
