import { useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function AppointmentForm({ doctorId, onBooked }) {
  const { notify } = useNotification();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("stayhealthy_token") || ""}`,
        },
        body: JSON.stringify({ doctorId, name, phone, date, time }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Could not book appointment");
      }
      notify("Appointment booked.");
      onBooked?.(data);
      setName("");
      setPhone("");
      setDate("");
      setTime("");
    } catch (err) {
      notify(err.message || "Booking error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Book an appointment</h3>
      <div className="field">
        <label htmlFor="appt-name">Name</label>
        <input id="appt-name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="appt-phone">Phone number</label>
        <input
          id="appt-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="appt-date">Date</label>
        <input id="appt-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="appt-time">Time</label>
        <input id="appt-time" type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading || !doctorId}>
        {loading ? "Booking…" : "Confirm appointment"}
      </button>
    </form>
  );
}
