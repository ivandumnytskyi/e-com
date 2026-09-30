'use client'
import GoogleIcon from "./GoogleSVG";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
    >
      <GoogleIcon />
      <span className="text-base font-medium">Continue with Google</span>
    </button>
  );
};

export default SignInButton;
