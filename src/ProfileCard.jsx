import { useEffect, useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function ProfileCard() {
  const { notify } = useNotification();
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("stayhealthy_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setProfile({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
        });
        setDraft({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
        });
      } catch {
        /* ignore */
      }
    }
  }, []);

  async function saveProfile(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("stayhealthy_token") || ""}`,
        },
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }
      const next = data.user || draft;
      setProfile(next);
      localStorage.setItem("stayhealthy_user", JSON.stringify(next));
      setEditing(false);
      notify("Profile updated.");
    } catch (err) {
      notify(err.message || "Profile error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h3>Your profile</h3>
      {!editing ? (
        <div>
          <p>
            <strong>Name:</strong> {profile.name || "—"}
          </p>
          <p>
            <strong>Email:</strong> {profile.email || "—"}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone || "—"}
          </p>
          <button type="button" className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit profile
          </button>
        </div>
      ) : (
        <form onSubmit={saveProfile}>
          <div className="field">
            <label htmlFor="pf-name">Name</label>
            <input
              id="pf-name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="pf-email">Email</label>
            <input
              id="pf-email"
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="pf-phone">Phone</label>
            <input
              id="pf-phone"
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Save
          </button>
          <button
            type="button"
            className="btn"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setDraft(profile);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
