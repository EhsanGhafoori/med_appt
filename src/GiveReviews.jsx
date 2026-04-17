import { useState } from "react";
import { getApiBase } from "./api.js";
import { useNotification } from "./NotificationContext.jsx";

export default function GiveReviews({ doctorId }) {
  const { notify } = useNotification();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitted) return;
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("stayhealthy_token") || ""}`,
        },
        body: JSON.stringify({ doctorId, rating: Number(rating), comment }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Review failed");
      }
      setSubmitted(true);
      notify("Thank you for your review.");
    } catch (err) {
      notify(err.message || "Review error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} aria-disabled={submitted}>
      <h3>Leave a review</h3>
      <fieldset disabled={submitted} style={{ border: "none", margin: 0, padding: 0 }}>
        <legend className="sr-only">Review form</legend>
        <div className="field">
          <label htmlFor="rating">Rating (1–5)</label>
          <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="comment">Comments</label>
          <textarea id="comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
      </fieldset>
      <button className="btn btn-primary" type="submit" disabled={loading || submitted || !doctorId}>
        {submitted ? "Review submitted" : loading ? "Submitting…" : "Submit review"}
      </button>
      {submitted ? (
        <p style={{ marginTop: "0.75rem", color: "#047857", fontWeight: 600 }}>
          Post-submission: all review fields and submit are disabled (fieldset disabled=true).
        </p>
      ) : null}
    </form>
  );
}
