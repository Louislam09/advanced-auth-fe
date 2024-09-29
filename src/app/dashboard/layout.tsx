"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) redirect("/login");

  return <main className="min-h-ful">{children}</main>;
}
