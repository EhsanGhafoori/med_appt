/**
 * StayHealthy — **Appointment Booking** flow
 * This component implements **doctor search** used when booking an appointment
 * (keyword + specialty, then GET `/api/doctors/search`).
 */
import { useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function FindDoctorSearch({ onResults }) {
  const { notify } = useNotification();
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (specialty) params.set("specialty", specialty);
      const res = await fetch(`${getApiBase()}/api/doctors/search?${params.toString()}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Search failed");
      }
      const doctors = data.doctors || data.results || [];
      onResults?.(doctors);
      notify(`Found ${doctors.length} doctor(s).`);
    } catch (err) {
      notify(err.message || "Search error");
      onResults?.([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
      <h3>Find a doctor (appointment booking)</h3>
      <div className="field">
        <label htmlFor="doc-search">Name or keyword</label>
        <input
          id="doc-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Dr. Rivera"
        />
      </div>
      <div className="field">
        <label htmlFor="doc-specialty">Specialty</label>
        <input
          id="doc-specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="e.g. General practice"
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Searching…" : "Search doctors"}
      </button>
    </form>
  );
}
