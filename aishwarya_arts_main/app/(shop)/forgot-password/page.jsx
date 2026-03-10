"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Check your email for the reset link!", {
          icon: '✉️',
          duration: 5000
        });
      } else {
        // Show the actual error message from the backend if available
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] font-outfit px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-md z-10">
        {/* Back Link */}
        <Link 
          href="/login" 
          className="flex items-center gap-2 text-zinc-800 hover:text-amber-800 transition-colors mb-8 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">Back to Login</span>
        </Link>

        <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-3 tracking-tight">
              Forgot Password?
            </h2>
            <p className="text-zinc-800 text-sm leading-relaxed px-4">
              Don&apos;t worry! Enter your email below and we&apos;ll send you a link to reset your account access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-amber-600 focus:bg-white transition-all text-zinc-900"
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={20} />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-900 transition-all duration-300 shadow-xl shadow-zinc-200 disabled:bg-zinc-300 disabled:shadow-none flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-50 text-center">
            <p className="text-zinc-800 text-xs uppercase tracking-widest font-medium">
              Aishwarya Arts &bull; Premium Tanjore Gallery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}