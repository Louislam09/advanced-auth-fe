"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";
import { formatJoinedDate, FormatOption } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

type DashboardProps = object;

export default function Dashboard({}: DashboardProps) {
  const { user, logout } = useAuth();
  const {
    name,
    email,
    createdAt: joinedDate,
    isVerified,
    lastLogin,
  } = user || {};

  if (!user) {
    return <div>Loading...</div>;
  }

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 animate-fade-in-down">
          Dashboard
        </h1>

        <div className="bg-gray-700 rounded-lg p-4 mb-6 transform transition-all duration-300 ease-in-out hover:bg-gray-600 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-blue-400 mb-2 flex items-center justify-between">
            Profile Information
            <Badge
              variant={isVerified ? "success" : "destructive"}
              className="ml-2 flex items-center"
            >
              {isVerified ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-1" />
                  Not Verified
                </>
              )}
            </Badge>
          </h2>
          <p className="text-gray-300">
            <b>Name:</b> {name}
          </p>
          <p className="text-gray-300">
            <b>Email:</b> {email}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 mb-6 transform transition-all duration-300 ease-in-out hover:bg-gray-600 animate-fade-in-up animation-delay-150">
          <h2 className="text-lg font-semibold text-blue-400 mb-2">
            Account Activity
          </h2>
          <p className="text-gray-300">
            <b>Joined:</b>{" "}
            {formatJoinedDate(joinedDate || "", FormatOption.LongDate)}
          </p>
          <p className="text-gray-300">
            <b>Last Login: </b>
            {formatJoinedDate(lastLogin || "", FormatOption.LongDate)}
          </p>
        </div>

        <Button
          onClick={onLogout}
          className="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded transform transition-all duration-300 ease-in-out hover:scale-105 animate-fade-in-up animation-delay-300"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
