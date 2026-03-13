"use client";

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/sendEmail"; // Adjust path as needed
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success("Inquiry sent! We'll contact you soon.");
        event.target.reset();
      } else {
        toast.error("Error: " + (result.error || "Failed to send"));
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-start">
        {/* LEFT CONTENT */}
        <div>
          <h3 className="text-5xl font-semibold mb-8 leading-tight">Connect With Us</h3>
          <p className="text-gray-800 text-xl mb-6 leading-relaxed">
            From traditional Tanjore paintings to personalized art commissions,
            our studio creates pieces that last generations.
          </p>
          <div className="space-y-2 text-lg">
            <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent leading-none ">Aishwarya Arts  </h1>
            <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent leading-none "> Tanjore Art Gallery </h1>

            <p className="text-gray-800">3/648, Thuraiyur Road, N. Kosavampatti Namakkal Tamilnadu - 637002</p>
            <p className="text-gray-800 font-medium">Phone: <span className="text-gray-600">+91 9655007661</span></p>
            <p className="text-gray-800 font-medium">Email: <span className="text-gray-600">contact.aishwaryaarts@gmail.com</span></p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/90 backdrop-blur-lg border border-gray-100 shadow-2xl rounded-3xl p-12">
          <h2 className="text-3xl font-semibold mb-10">Send us a message</h2>

          {/* ADDED onSubmit HERE */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">First Name</label>
              <input
                name="firstName" // ADDED NAME
                type="text"
                required
                className="border p-4 rounded-xl text-lg w-full focus:ring-2 focus:ring-black outline-none"
                placeholder="John"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">Last Name</label>
              <input
                name="lastName" // ADDED NAME
                type="text"
                className="border p-4 rounded-xl text-lg w-full focus:ring-2 focus:ring-black outline-none"
                placeholder="Doe"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-base font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input
                name="phone" // ADDED NAME
                type="text"
                required
                className="border p-4 rounded-xl text-lg w-full focus:ring-2 focus:ring-black outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-base font-medium mb-1">Email Address</label>
              <input
                name="email" // ADDED NAME
                type="email"
                required
                className="border p-4 rounded-xl text-lg w-full focus:ring-2 focus:ring-black outline-none"
                placeholder="example@email.com"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-base font-medium mb-1">Message</label>
              <textarea
                name="message" // ADDED NAME
                required
                className="border p-4 rounded-xl text-lg w-full focus:ring-2 focus:ring-black outline-none"
                rows="4"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-4 px-10 rounded-2xl md:col-span-2 font-semibold text-xl shadow-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin" /> Sending...</> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}