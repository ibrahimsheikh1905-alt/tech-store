// app/verified/page.jsx
"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function VerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card shadow-lg rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-serif font-bold mb-4 text-foreground">
          Email Verified!
        </h1>
        <p className="text-sm text-foreground/80 mb-6">
          Your email has been successfully verified. You can now login to your account.
        </p>
        <Link
          href="/login"
          className="inline-block bg-primary text-primary-foreground py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}