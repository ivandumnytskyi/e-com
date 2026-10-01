import SignInButton from "@/components/Signin/SignInButton";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mx-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to E-com
          </h2>
          <p className="text-gray-600">
            Sign in to be able use all features
          </p>
        </div>

        <div className="mt-8">
          <SignInButton demoEnabled={process.env.DEMO_LOGIN_ENABLED === "true"} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}