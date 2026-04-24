import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  function handleLogout() {
    localStorage.removeItem("stayhealthy_token");
    localStorage.removeItem("stayhealthy_user");
    notify("You have been logged out.");
    navigate("/login");
  }

  return (
    <header
      style={{
        background: "#0f766e",
        color: "#fff",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>
        StayHealthy
      </Link>
      <nav style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <Link to="/" style={{ color: "#ecfeff" }}>
          Home
        </Link>
        <Link to="/appointments" style={{ color: "#ecfeff" }}>
          Appointments
        </Link>
        <Link to="/signup" style={{ color: "#ecfeff" }}>
          Sign Up
        </Link>
        <Link to="/login" style={{ color: "#ecfeff" }}>
          Login
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="btn"
          style={{ background: "#134e4a", color: "#fff" }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
