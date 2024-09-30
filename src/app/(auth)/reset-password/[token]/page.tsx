"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthProvider";
import { Loader } from "lucide-react";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = params;
  const { resetPassword, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(token, newPassword);
      setSuccess(
        "Password reset successfully. You can now log in with your new password."
      );
    } catch (err) {
      console.log(err);
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <p className="text-center text-gray-400">Enter your new password</p>
      <Input
        className="text-black"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        {loading ? (
          <Loader className="animate-spin mr-2" />
        ) : (
          "Set New Password"
        )}
      </Button>
    </form>
  );
}
