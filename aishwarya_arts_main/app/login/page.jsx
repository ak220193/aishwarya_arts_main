"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    // Email + Password login (credentials)
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      toast.success("Login successful");
      router.push("/"); // redirect to homepage or products
    }
  };

  // OAuth login handler
  const handleOAuthLogin = async (provider) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Login to Your Account
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* ================= Email / Password Form ================= */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
          />
          <span
            className="absolute right-3 top-1/2 translate-y-1/4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="mb-6 text-right">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* ================= OAuth Login ================= */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="/assets/auth/google-icon-logo-svgrepo-com.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
          {/* Add more providers here, e.g., GitHub, Facebook */}
        </div>

        <p className="mt-6 text-center text-gray-600">
          New here?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
