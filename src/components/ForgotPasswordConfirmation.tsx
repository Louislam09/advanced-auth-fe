import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface ForgotPasswordConfirmationProps {
  email: string;
}

export default function ForgotPasswordConfirmation({
  email,
}: ForgotPasswordConfirmationProps) {
  const router = useRouter();

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-blue-500">
          Forgot Password
        </h2>
        <div className="mt-8 bg-blue-500 rounded-full p-3 inline-block">
          <Mail className="h-8 w-8 text-gray-900" />
        </div>
        <p className="mt-6 text-sm text-gray-400">
          If an account exists for <b className="text-blue-400">{email}</b>, you
          will receive a password reset link shortly.
        </p>
      </div>
      <div className="mt-8">
        <button
          onClick={() => router.push("/login")}
          // className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
          className="text-blue-400 hover:underline w-full text-center items-center flex justify-center"
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
      </div>
    </div>
  );
}
