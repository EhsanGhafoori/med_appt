import { useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function AppointmentFormIC({ doctorId, onBooked }) {
  const { notify } = useNotification();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/appointments/ic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("stayhealthy_token") || ""}`,
        },
        body: JSON.stringify({ doctorId, name, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Could not book");
      }
      notify("Initial contact request sent.");
      onBooked?.(data);
      setName("");
      setPhone("");
    } catch (err) {
      notify(err.message || "Booking error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Immediate contact (name &amp; phone only)</h3>
      <div className="field">
        <label htmlFor="ic-name">Name</label>
        <input id="ic-name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="ic-phone">Phone number</label>
        <input
          id="ic-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading || !doctorId}>
        {loading ? "Sending…" : "Request callback"}
      </button>
    </form>
  );
}
