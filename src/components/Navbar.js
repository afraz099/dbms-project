import Link from "next/link";

const Navbar = () => {
  return (
    <div style={styles.wrapper}>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}><Link href="/" style={styles.link}>Blood Bank</Link></h2>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}><Link href="/request" style={styles.link}>Request</Link></li>
          <li style={styles.navItem}><Link href="/adminLoginPage2" style={styles.link}>Donate</Link></li>
          <li style={styles.navItem}><Link href="/adminLogin" style={styles.link}>Admin</Link></li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    top: "16px",
    left: "16px",
    right: "16px",
    zIndex: 1000,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#d32f2f",
    color: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "24px",
    margin: 0,
    padding: 0,
  },
  navItem: {
    padding: "8px 0",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "0.5px",
  },
};

export default Navbar;