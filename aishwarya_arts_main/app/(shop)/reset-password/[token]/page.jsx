"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Use useParams to get the token
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams(); // This gets the 'a9bb406...' from the URL
  const token = params.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success("Password updated successfully!");
        router.push("/login");
      } else {
        const data = await res.json();
        toast.error(data.error || "Link expired or invalid.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] font-outfit px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl border border-zinc-100">
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">New Password</h2>
        <p className="text-zinc-500 text-sm mb-8">Please enter your new secure password.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="password" 
            placeholder="New Password" 
            className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-amber-600 transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-amber-600 transition-all"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          <button 
            disabled={loading}
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-amber-900 transition-all disabled:bg-zinc-300"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}