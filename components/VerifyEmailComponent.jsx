"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react"; // ✅ Success icon

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card shadow-lg rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-serif font-bold mb-4 text-foreground">
          Verify Your Email
        </h1>
        <p className="text-sm text-foreground/80 mb-6">
          A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your account.
        </p>
        <p className="text-sm text-accent mb-4">
          After verification, you can{" "}
          <Link href="/login" className="underline font-semibold">
            login
          </Link>{" "}
          to your account.
        </p>
      </div>
    </div>
  );
}