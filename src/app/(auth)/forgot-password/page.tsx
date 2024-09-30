/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import ForgotPasswordConfirmation from "@/components/ForgotPasswordConfirmation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthProvider";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ForgotPasswordProps = object;

export default function ForgotPassword({}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { forgotPassword, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      console.log(response);

      setSuccess(
        "Password reset email sent successfully. Please check your inbox."
      );
    } catch (err) {
      console.log(err);
      setSuccess("");
    }
  };

  if (success) {
    return <ForgotPasswordConfirmation email={email} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <p className="text-center text-gray-400">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>
      <Input
        className="text-black"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        {loading ? <Loader className="animate-spin mr-2" /> : "Send Reset Link"}
      </Button>
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="text-blue-400 hover:underline  w-full text-center items-center flex justify-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Login
      </button>
    </form>
  );
}
