"use client";

import React, { useState, useEffect } from "react";

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: isOnline ? "green" : "red",
        color: "white",
        textAlign: "center",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      {isOnline ? "Online" : "Offline"}
    </div>
  );
};

export default ConnectionStatus;
