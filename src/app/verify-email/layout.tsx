"use client";

import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) redirect("/login");
  if (user?.isVerified) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="flex justify-center">
          <Image
            src="/assets/images/logo.png"
            alt="Auth Simplified Logo"
            width={100}
            height={100}
            className="animate-fade-in-down"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
