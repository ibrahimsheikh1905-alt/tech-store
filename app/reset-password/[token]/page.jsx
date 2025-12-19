"use client";

import { AuthProvider, useAuth } from "@/context/auth-context";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

function ResetPasswordForm({ token }) {
  const { resetPassword } = useAuth();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await resetPassword(token, password);
    
    // ✅ Show backend message whether success or not
    setMessage(res.message);

    if (res.success) {
      setTimeout(() => router.push("/login"), 1500);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white py-2 rounded hover:bg-accent-dark transition-colors"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-400 font-medium">{message}</p>}
    </div>
  );
}

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token;

  return (
    <AuthProvider>
      <ResetPasswordForm token={token} />
    </AuthProvider>
  );
}