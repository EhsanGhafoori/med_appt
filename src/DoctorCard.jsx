import { useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

const STORAGE_APPOINTMENTS = "stayhealthy_appointments";

function removeAppointmentFromStorage(appointmentId) {
  localStorage.removeItem(`stayhealthy_appt_${appointmentId}`);
  const raw = localStorage.getItem(STORAGE_APPOINTMENTS);
  if (!raw) return;
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) {
      localStorage.removeItem(STORAGE_APPOINTMENTS);
      return;
    }
    const next = arr.filter((row) => row?.id !== appointmentId);
    if (next.length === 0) {
      localStorage.removeItem(STORAGE_APPOINTMENTS);
    } else {
      localStorage.setItem(STORAGE_APPOINTMENTS, JSON.stringify(next));
    }
  } catch {
    localStorage.removeItem(STORAGE_APPOINTMENTS);
  }
}

export default function DoctorCard({ doctor, appointmentId, onCancelled }) {
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  async function cancelAppointment() {
    if (!appointmentId || cancelled) {
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
      removeAppointmentFromStorage(appointmentId);
      setCancelled(true);
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
        {cancelled ? (
          <p style={{ margin: "0.5rem 0 0", color: "#b45309", fontWeight: 600 }}>Appointment cancelled</p>
        ) : null}
      </div>
      {!cancelled ? (
        <button type="button" className="btn btn-danger" onClick={cancelAppointment} disabled={loading}>
          {loading ? "Cancelling…" : "Cancel appointment"}
        </button>
      ) : null}
    </div>
  );
}
