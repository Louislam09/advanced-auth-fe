/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginProps = object;

export default function Login({}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Login successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Log In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Input
        className="text-black"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        className="text-black"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      <div className="text-center space-y-2 ">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-blue-400 hover:underline"
        >
          Forgot Password?
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-blue-400 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}
