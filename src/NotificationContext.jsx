import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  const notify = useCallback((msg) => {
    setMessage(msg || "");
    if (msg) {
      window.setTimeout(() => setMessage(""), 5000);
    }
  }, []);

  const value = useMemo(() => ({ notify, message }), [notify, message]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {message ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            background: "#115e59",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 9999,
            maxWidth: 360,
          }}
        >
          {message}
        </div>
      ) : null}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return ctx;
}
