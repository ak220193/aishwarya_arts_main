"use client";
import React, { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Lock, 
  CheckCircle2,
  CreditCard,
  AlertCircle,
  Info,
  Truck
} from "lucide-react";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  
  const cart = useCartStore((state) => state.cart);
  const { user } = useAuthStore();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    altPhone: ""
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shippingCost;

  useEffect(() => {
    setMounted(true);
    if (cart.length === 0) router.push("/collections");
  }, [cart, router]);

  if (!mounted) return null;

  // Validation Logic
  const validateStep1 = () => {
    const { firstName, lastName, address, city, state, pincode } = formData;
    if (!firstName || !lastName || !address || !city || !state || !pincode) {
      toast.error("Please fill in all required delivery details");
      return false;
    }
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-white text-black font-outfit">
      {/* --- HEADER --- */}
      <header className="border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/">
             <h2 className="text-2xl font-bold uppercase tracking-tight">Tanjore Art Heritage</h2>
          </Link>
          <div className="flex items-center gap-2 text-green-600">
            <Lock size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* --- LEFT: STEP-BASED FORM --- */}
          <div className="w-full lg:w-[55%] order-2 lg:order-1">
            <nav className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest mb-12">
              <span className={currentStep >= 1 ? "text-black" : "text-gray-300"}>Information</span>
              <ChevronRight size={16} className="text-gray-300" />
              <span className={currentStep >= 2 ? "text-black" : "text-gray-300"}>Shipping</span>
              <ChevronRight size={16} className="text-gray-300" />
              <span className={currentStep >= 3 ? "text-black" : "text-gray-300"}>Payment</span>
            </nav>

            {currentStep === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* 1. Account Details (Read Only) */}
                <section>
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                    Contact Information <CheckCircle2 size={18} className="text-green-600" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Registered Email</p>
                      <p className="text-sm font-semibold">{user?.email || "naresh@example.com"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Phone</p>
                      <p className="text-sm font-semibold">{user?.phone || "+91 9345336311"}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] text-gray-400 flex items-center gap-1 italic">
                    <Info size={12} /> These details are linked to your profile and cannot be changed here.
                  </p>
                </section>

                {/* 2. Shipping Address */}
                <section className="space-y-6">
                  <h3 className="text-lg font-bold">Delivery Address</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First name" 
                      className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none"
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Last name" 
                      className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none"
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select 
                      className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none bg-white"
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UAE">UAE</option>
                    </select>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">+91</span>
                      <input 
                        type="tel" 
                        placeholder="Alternate Mobile (Optional)" 
                        className="w-full p-4 pl-12 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none"
                        onChange={(e) => setFormData({...formData, altPhone: e.target.value})}
                      />
                    </div>
                  </div>

                  <input 
                    type="text" 
                    placeholder="Address (House No, Building, Street Name)" 
                    className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none"
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                   <input 
                    type="text" 
                    placeholder="Address (House No, Building, Street Name)" 
                    className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none"
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    <input type="text" placeholder="State" className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({...formData, state: e.target.value})} />
                    <input type="text" placeholder="PIN" className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                  </div>
                </section>

                <div className="pt-8 flex items-center justify-between border-t">
                  <Link href="/cart" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ChevronLeft size={16} /> Back to cart
                  </Link>
                  <button onClick={handleNext} className="px-12 py-5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                    Continue to shipping
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING CHOICE */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-lg font-bold">Shipping Method</h3>
                <div className="border-2 border-black rounded-2xl p-6 flex justify-between items-center bg-gray-50">
                  <div className="flex gap-4 items-center">
                    <Truck size={24} />
                    <div>
                      <p className="text-sm font-bold">Premium Insured Art Courier</p>
                      <p className="text-xs text-gray-800">Safe delivery for Heritage Artworks (3-5 Days)</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
                </div>
                <div className="pt-8 flex items-center justify-between border-t">
                  <button onClick={() => setCurrentStep(1)} className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ChevronLeft size={16} /> Return to Info
                  </button>
                  <button onClick={handleNext} className="px-12 py-5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --- RIGHT: STICKY ORDER SUMMARY --- */}
          <aside className="w-full lg:w-[50%] lg:sticky lg:top-24 bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 lg:p-8 order-1 lg:order-2">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-10 text-black">Order Summary</h2>
            
            <div className="space-y-8 mb-10 overflow-y-auto max-h-[480px] pr-4 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative h-40 w-40  rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-contain p-2 " />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold leading-snug">{item.title}</h4>
                    <p className="text-[12px] text-amber-500 font-bold mt-1 uppercase tracking-widest">{item.size || "Standard Size"}</p>
                    <p className="text-md font-bold mt-2">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-200">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Shipping</span>
                <span className={shippingCost === 0 ? "text-green-600" : ""}>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between items-center pt-8 mt-6 border-t-2 border-black">
                <span className="text-sm font-bold uppercase tracking-widest">Total Payable</span>
                <span className="text-3xl font-bold tracking-tighter">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-10 p-5 bg-white rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <ShieldCheck className="text-green-600 shrink-0" size={24} />
              <p className="text-[10px] font-bold leading-relaxed text-gray-500 uppercase tracking-wider">
                This order includes a <span className="text-black">22K Gold Foil Certificate</span> and traditional Teak Wood framing.
              </p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;