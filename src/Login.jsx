import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (data.token) {
        localStorage.setItem("stayhealthy_token", data.token);
      }
      if (data.user) {
        localStorage.setItem("stayhealthy_user", JSON.stringify(data.user));
      }
      notify("Welcome back!");
      navigate("/appointments");
    } catch (err) {
      notify(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 400, margin: "0 auto" }}>
        <h2>Log in to StayHealthy</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
