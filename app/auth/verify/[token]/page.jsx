"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function VerifyEmailPage() {
  const { token } = useParams();

  useEffect(() => {
    if (!token) return;

    fetch(`http://localhost:5000/api/auth/verify/${token}`)
      .then(() => {
        // backend khud redirect karega
      })
      .catch(() => {
        alert("Verification failed");
      });
  }, [token]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Verifying your email...</h2>
      <p>Please wait</p>
    </div>
  );
}