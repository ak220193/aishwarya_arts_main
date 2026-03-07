"use client";
import React, { useState, useEffect } from "react";
import { useCartStore } from "../../../store/useCartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck, ChevronLeft, ChevronRight, Lock,
  CheckCircle2, Info, Truck, Landmark, Wallet
} from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", country: "India",
    address: "", city: "", state: "", pincode: "",
    altPhone: "", primaryPhone: ""
  });

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gstAmount = Math.round(subtotal * 0.05);
  const shippingCost = subtotal > 50000 ? 0 : 650;
  const total = subtotal + gstAmount + shippingCost;

  // 1. Fetch Profile Data
  useEffect(() => {
    setMounted(true);
    if (cart.length === 0 && mounted) router.push("/collections");

    const loadUserData = async () => {
      try {
        const res = await fetch("/api/users/profile");
        const result = await res.json();
        if (result.success) {
          const u = result.data;
          setFormData({
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            country: "India",
            address: u.address?.houseNo ? `${u.address.houseNo}, ${u.address.street}` : "",
            city: u.address?.city || "",
            state: u.address?.state || "",
            pincode: u.address?.pincode || "",
            altPhone: u.alternatePhone || "",
            primaryPhone: u.primaryPhone || ""
          });
        }
      } catch (error) { console.error("Error loading data", error); }
    };
    if (session) loadUserData();
  }, [session, cart.length, router, mounted]);

  // 2. The Order Submission Handler (No Payment Gateway Needed)
  const handleOrderSubmit = async () => {
    const loadingToast = toast.loading("Processing your masterpiece order...");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderItems: cart,
          // Combine fields here to satisfy the Schema requirement
          shippingAddress: {
            fullName: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            phone: formData.primaryPhone
          },
          totalAmount: total,
          paymentMethod: paymentMethod,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Order Placed Successfully!", { id: loadingToast });
        clearCart(); // Clear Zustand cart
        router.push("/orders"); // Redirect to orders page
      } else {
        toast.error(result.message || "Failed to place order", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", { id: loadingToast });
    }
  };

  const validateStep1 = () => {
    const { firstName, lastName, address, city, state, pincode } = formData;
    if (!firstName || !lastName || !address || !city || !state || !pincode) {
      toast.error("Please fill in all delivery details");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
  };

  if (!mounted) return null;

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
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-[55%] order-2 lg:order-1">
            <nav className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest mb-12">
              <span className={currentStep >= 1 ? "text-black" : "text-gray-300"}>Information</span>
              <ChevronRight size={16} className="text-gray-300" />
              <span className={currentStep >= 2 ? "text-black" : "text-gray-300"}>Shipping</span>
              <ChevronRight size={16} className="text-gray-300" />
              <span className={currentStep >= 3 ? "text-black" : "text-gray-300"}>Payment</span>
            </nav>

            {currentStep === 1 && (
              <div className="space-y-10">
                <section>
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2">Contact Info <CheckCircle2 size={18} className="text-green-600" /></h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-sm font-semibold">{session?.user?.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Phone</p>
                      <p className="text-sm font-semibold">{formData.primaryPhone || "Added in Profile"}</p>
                    </div>
                  </div>
                </section>
                <section className="space-y-6">
                  <h3 className="text-lg font-bold">Delivery Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" value={formData.firstName} className="p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    <input type="text" placeholder="Last name" value={formData.lastName} className="p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                  <input type="text" placeholder="Address (House No, Street)" value={formData.address} className="w-full p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" value={formData.city} className="p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    <input type="text" placeholder="State" value={formData.state} className="p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                    <input type="text" placeholder="PIN" value={formData.pincode} className="p-4 border border-gray-200 rounded-xl text-sm font-semibold focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                  </div>
                </section>
                <div className="pt-8 flex items-center justify-between border-t">
                  <Link href="/cart" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"><ChevronLeft size={16} /> Back to cart</Link>
                  <button onClick={handleNext} className="px-12 py-5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800">Continue to shipping</button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold">Shipping Method</h3>
                <div className="border-2 border-black rounded-2xl p-6 flex justify-between items-center bg-gray-50">
                  <div className="flex gap-4 items-center">
                    <Truck size={24} />
                    <div>
                      <p className="text-sm font-bold">Premium Art Courier</p>
                      <p className="text-xs text-gray-800">Insured Delivery for Heritage Art (3-5 Days)</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
                </div>
                <div className="pt-8 flex items-center justify-between border-t">
                  <button onClick={() => setCurrentStep(1)} className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"><ChevronLeft size={16} /> Return to Info</button>
                  <button onClick={handleNext} className="px-12 py-5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest">Continue to Payment</button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-xl font-bold">Select Payment</h3>
                <div className="space-y-4">
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-6 border-2 rounded-2xl cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'COD' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                  >
                    <Wallet size={24} className={paymentMethod === 'COD' ? "text-black" : "text-gray-300"} />
                    <div className="flex-1">
                      <p className="text-sm font-bold">Cash on Delivery</p>
                      <p className="text-xs text-gray-500 italic">Pay when your artwork arrives.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === 'COD' ? 'border-black' : 'border-gray-200'}`} />
                  </div>

                  {/* BANK */}
                  <div
                    onClick={() => setPaymentMethod("BANK")}
                    className={`p-6 border-2 rounded-2xl cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'BANK' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                  >
                    <Landmark size={24} className={paymentMethod === 'BANK' ? "text-black" : "text-gray-300"} />
                    <div className="flex-1">
                      <p className="text-sm font-bold">Bank Transfer</p>
                      <p className="text-xs text-gray-500 italic">NEFT/IMPS Details provided after order.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === 'BANK' ? 'border-black' : 'border-gray-200'}`} />
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between border-t">
                  <button onClick={() => setCurrentStep(2)} className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"><ChevronLeft size={16} /> Return to Shipping</button>
                  <button onClick={handleOrderSubmit} className="px-12 py-5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl">Confirm & Place Order</button>
                </div>
              </div>
            )}
          </div>

          {/* --- RIGHT: ENHANCED ORDER SUMMARY --- */}
          <aside className="w-full lg:w-[40%] lg:sticky lg:top-24 bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 order-1 lg:order-2">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 overflow-y-auto max-h-96 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start pb-6 border-b border-gray-200 last:border-0">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-200">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 leading-tight">{item.title}</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-zinc-600 font-bold uppercase tracking-wider">Size: {item.size || "12x10 inches"}</p>
                      <p className="text-xs text-zinc-600 font-bold uppercase tracking-wider">Frame: {item.frame || "Teak Wood"}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-bold">QTY: {item.quantity}</p>
                      <p className="text-lg font-bold text-zinc-900">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span>Subtotal</span>
                <span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-1">GST (5%) <Info size={12} /></span>
                <span className="text-black">₹{gstAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? "text-green-600" : "text-black"}>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-black">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                  <span className="text-xs text-zinc-400 font-medium tracking-tight italic">Net Payable Amount</span>
                </div>
                <span className="text-2xl font-bold tracking-tighter">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-start gap-3 shadow-sm">
                <ShieldCheck className="text-green-600 shrink-0" size={20} />
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wider">Authenticity Guaranteed</p>
                  <p className="text-[10px] leading-relaxed text-gray-500 italic font-medium">Includes 22K Gold Foil Certificate.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;