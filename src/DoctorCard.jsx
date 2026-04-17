import { useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function DoctorCard({ doctor, appointmentId, onCancelled }) {
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);

  async function cancelAppointment() {
    if (!appointmentId) {
      notify("No active appointment to cancel.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/appointments/${appointmentId}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stayhealthy_token") || ""}`,
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Cancel failed");
      }
      notify("Appointment cancelled.");
      onCancelled?.(appointmentId);
    } catch (err) {
      notify(err.message || "Cancel error");
    } finally {
      setLoading(false);
    }
  }

  if (!doctor) return null;

  return (
    <div
      className="card"
      style={{
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 0.25rem" }}>{doctor.name}</h4>
        <p style={{ margin: 0, color: "#475569" }}>{doctor.specialty}</p>
        {doctor.city ? <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem" }}>{doctor.city}</p> : null}
      </div>
      <button type="button" className="btn btn-danger" onClick={cancelAppointment} disabled={loading}>
        {loading ? "Cancelling…" : "Cancel appointment"}
      </button>
    </div>
  );
}
