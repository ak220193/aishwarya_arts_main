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
        if (data.success) {
          const user = data.data;
          const mappedData = {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            primaryPhone: user.primaryPhone || "",
            alternatePhone: user.alternatePhone || "",
            city: user.address?.city || "",
            pincode: user.address?.pincode || "",
            landmark: user.address?.landmark || "",
            addressLine1: user.address?.houseNo || "",
            addressLine2: user.address?.street || "",
          };
          setFormData(mappedData);
          setInitialData(mappedData); // Fixed syntax error here
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchProfile();
  }, [status]);

  // 1. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Cancel Changes: Reset to the version from DB
  const handleCancel = () => {
    setFormData(initialData);
    toast.error("Changes discarded");
  };

  // 3. Form Submit Trigger (Shows Modal)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // 4. Actual Save function (Triggered by Modal)
  const confirmSave = async () => {
    setShowModal(false);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          alternatePhone: formData.alternatePhone,
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
        // IMPORTANT: Update the 'InitialData' so the UI 'locks in' the new values
        setInitialData(formData); 
        toast.success("Details updated successfully!");
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };
  if (status === "loading" || loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <AccountSidebar />

          <section className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your personal information and address
              </p>
            </div>

            {/* Form triggers handleFormSubmit to show modal first */}
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} disabled />
              <Input label="Phone Number" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} disabled />
              <Input label="Alternate Phone Number" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
              <Input label="City" name="city" value={formData.city} onChange={handleChange} />
              <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
              <Input label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
              <Input label="Address Line 1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} full />
              <Input label="Address Line 2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} full />

              <div className="md:col-span-2 pt-6 flex gap-4">
                <button type="submit" className="rounded-lg bg-linear-to-r from-yellow-700 to-yellow-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition">
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

      {/* ================= MODAL OVERLAY ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Save Changes?</h3>
            <p className="text-gray-600 mb-6 text-sm">Are you sure you want to update your profile details?</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmSave} 
                className="w-full bg-yellow-600 text-white py-2.5 rounded-lg font-bold hover:bg-yellow-700 transition"
              >
                Yes, Save
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-full text-gray-500 py-2 text-sm hover:bg-gray-50 rounded-lg transition"
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
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
  </div>
);

export default ProfilePage;