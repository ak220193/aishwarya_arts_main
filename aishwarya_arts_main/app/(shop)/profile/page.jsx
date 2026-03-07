"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AccountSidebar from "../../components/profile/AccountSidebar";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    primaryPhone: "",
    alternatePhone: "",
    city: "",
    pincode: "",
    landmark: "",
    addressLine1: "",
    addressLine2: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/profile");
        const data = await res.json();
        
        // Fallback for Google Users: Pre-split the session name
        const sessionName = session?.user?.name?.split(" ") || ["", ""];
        const sessionEmail = session?.user?.email || "";

        if (data.success && data.data) {
          const user = data.data;

          const mappedData = {
            // FIXED: Using .trim() check to ensure we don't fetch " " (empty spaces)
            firstName: (user.firstName && user.firstName.trim() !== "") 
              ? user.firstName 
              : (sessionName[0] || ""),

            lastName: (user.lastName && user.lastName.trim() !== "") 
              ? user.lastName 
              : (sessionName.slice(1).join(" ") || ""),

            email: user.email || sessionEmail,
            primaryPhone: user.primaryPhone?.trim() || "",
            alternatePhone: user.alternatePhone || "",
            city: user.address?.city || "",
            pincode: user.address?.pincode || "",
            landmark: user.address?.landmark || "",
            addressLine1: user.address?.houseNo || "",
            addressLine2: user.address?.street || "",
          };

          setFormData(mappedData);
          setInitialData(mappedData);
        } else {
          // If no DB record exists yet (First time Google Login)
          setFormData(prev => ({
            ...prev,
            firstName: sessionName[0],
            lastName: sessionName.slice(1).join(" "),
            email: sessionEmail
          }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchProfile();
  }, [status, session?.user?.email]); // Optimized dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData(initialData);
    toast.error("Changes discarded");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.primaryPhone || formData.primaryPhone.length < 10) {
      return toast.error("A valid 10-digit Phone Number is required for shipping updates!");
    }
    setShowModal(true);
  };

  const confirmSave = async () => {
    const phoneValue = formData.primaryPhone?.trim();
    setShowModal(false);
    const loadingToast = toast.loading("Updating your masterpiece profile...");
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          // CRITICAL: .trim() and fallback to null for MongoDB Sparse Index to work
          primaryPhone: phoneValue === "" ? null : phoneValue, 
          alternatePhone: formData.alternatePhone?.trim() || "",
          address: {
            houseNo: formData.addressLine1,
            street: formData.addressLine2,
            city: formData.city,
            pincode: formData.pincode,
            landmark: formData.landmark,
          },
        }),
      });

      const result = await res.json();
      
      if (result.success) {
        setInitialData(formData); 
        toast.success("Details updated successfully!", { id: loadingToast });
      } else {
        toast.error(result.message || "Update failed", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: loadingToast });
    }
  };

  if (status === "loading" || loading) return <div className="p-20 text-center font-bold text-amber-800 italic uppercase tracking-widest">Syncing Art Signal...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 relative font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <AccountSidebar />

          <section className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                Provide your details for authenticated shipping and tracking.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} disabled />
              
              {/* FIXED LOGIC: Unlock phone number if it's missing (Google users) */}
              <Input 
                label="Primary Phone (Required for Delivery)" 
                name="primaryPhone" 
                value={formData.primaryPhone} 
                onChange={handleChange} 
                disabled={initialData.primaryPhone && initialData.primaryPhone.length >= 10} 
              />

              <Input label="Alternate Phone" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
              <Input label="City" name="city" value={formData.city} onChange={handleChange} />
              <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
              <Input label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
              <Input label="Address Line 1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} full />
              <Input label="Address Line 2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} full />

              <div className="md:col-span-2 pt-6 flex gap-4">
                <button type="submit" className="rounded-lg bg-zinc-900 px-8 py-3 text-white font-semibold hover:bg-amber-700 transition duration-300">
                  Save Changes
                </button>
                <button type="button" onClick={handleCancel} className="rounded-lg border border-gray-300 px-8 py-3 text-gray-700 font-medium hover:bg-gray-100 transition">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Update Profile?</h3>
            <p className="text-gray-600 mb-6 text-sm">This information will be used for shipping and tracking your orders.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmSave} 
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition"
              >
                Yes, Save Details
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-full text-gray-400 py-2 text-xs font-bold uppercase tracking-widest hover:text-zinc-900"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Input = ({ label, full, name, value, onChange, disabled }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 outline-none transition-all ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "text-gray-900"}`}
    />
  </div>
);

export default ProfilePage;