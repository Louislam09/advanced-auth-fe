"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (user && !user?.isVerified) redirect("/verify-email");
  if (user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-10 p-8 py-10 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
        {children}
      </div>
    </div>
  );
}
