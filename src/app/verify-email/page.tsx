"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resendVerificationEmail, verifyEmail } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircleIcon } from "lucide-react";

type VerifyEmailProps = object;

export default function VerifyEmail({}: VerifyEmailProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (pastedData.length === 6 && /^[0-9]+$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);

      // Automatically focus the last input
      const lastInput = document.getElementById(`code-5`) as HTMLInputElement;
      if (lastInput) lastInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(code.join(""));
      console.log(response);
      setSuccess("Email verified successfully!");
      setError("");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setError(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        err.response?.data?.message ||
          "An error occurred during email verification."
      );
      setSuccess("");
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendVerificationEmail();
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (err) {
      console.error("Failed to resend verification email:", err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-blue-500">{success}</p>}
      {resendSuccess && (
        <Alert variant="default">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            A new verification email has been sent. Please check your inbox.
          </AlertDescription>
        </Alert>
      )}
      <p className="text-center text-gray-400">
        Enter the 6-digit code sent to your email address.
      </p>
      <div className="flex justify-between">
        {code.map((digit, index) => (
          <Input
            onPaste={index === 0 ? handlePaste : undefined} // Add paste event listener only to the first input
            key={index}
            id={`code-${index}`}
            className="w-12 text-center text-black font-bold text-2xl"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        Verify Email
      </Button>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-2">
          Didn&apos;t receive the email or code expired?
        </p>
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={resendLoading}
        >
          {resendLoading ? (
            <>
              <LoaderCircleIcon className="animate-spin mr-2" />
              Resending...
            </>
          ) : (
            "Resend Verification Email"
          )}
        </Button>
      </div>
    </form>
  );
}
