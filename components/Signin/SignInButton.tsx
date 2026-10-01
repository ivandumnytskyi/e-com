'use client'
import GoogleIcon from "./GoogleSVG";
import { signIn } from "next-auth/react";

const SignInButton = ({ demoEnabled }: { demoEnabled: boolean }) => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <GoogleIcon />
        <span className="text-base font-medium">Continue with Google</span>
      </button>
      {demoEnabled && (
        <button
          type="button"
          onClick={() => signIn("demo", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-(--main-colour) font-medium text-white hover:opacity-90 transition-opacity"
        >
          Try demo account
        </button>
      )}
    </div>
  );
};

export default SignInButton;
