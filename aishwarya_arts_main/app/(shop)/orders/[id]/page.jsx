"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, Printer, Package, MapPin, 
  CreditCard, Calendar, Loader2 
} from "lucide-react";

const OrderDetails = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/orders/${id}`);
        const result = await res.json();
        if (result.success) {
          setOrder(result.data);
        } else {
          router.push("/orders");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-amber-800" size={32} />
      </div>
    );
  }

  if (!order) return null;

  // Calculation helpers to avoid logic errors
  const currentTotal = order.totalAmount || 0;
  const shipping = currentTotal > 50000 ? 0 : 650;
  const gst = Math.round(currentTotal * 0.05);
  const subtotal = currentTotal - gst - shipping;

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 font-outfit">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* --- TOP NAVIGATION --- */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link href="/orders" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition">
            <ChevronLeft size={18} /> Back to My Orders
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 transition"
          >
            <Printer size={16} /> Print Invoice
          </button>
        </div>

        {/* --- MAIN ORDER CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-8 lg:p-12 border-b border-gray-50 flex flex-wrap justify-between items-start gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Order Details</h1>
              <p className="text-sm font-mono text-amber-700 font-bold uppercase tracking-widest">
                #{order._id?.toUpperCase() || "LOADING..."}
              </p>
            </div>
            <div className="flex gap-10">
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest mb-1">Date</p>
                <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest mb-1">Status</p>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-semibold uppercase border border-amber-100">
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-md font-bold uppercase tracking-[0.2em] text-zinc-800 flex items-center gap-2">
                <Package size={20} /> Purchased Artworks
              </h3>
              <div className="space-y-6">
                {order.orderItems?.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-center">
                    <div className="relative h-28 w-24 rounded-2xl overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                      <p className="text-[10px] font-semibold text-zinc-800 uppercase tracking-widest mt-1">
                        {item.size} • {item.frame}
                      </p>
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-sm font-semibold text-zinc-800">Qty: {item.quantity}</span>
                        <span className="text-lg font-semibold text-gray-900">₹{item.price?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-50 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800 font-semibold uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-zinc-800 font-bold uppercase tracking-widest text-[10px]">GST (5%)</span>
                   <span className="font-bold">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-900">
                  <span className="font-semibold uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-3xl font-semibold tracking-tighter text-gray-900">₹{currentTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-800 flex items-center gap-2">
                  <MapPin size={14} /> Shipping To
                </h3>
                <div className="p-6 bg-gray-50 rounded-4xl border border-gray-100 space-y-2">
                  <p className="font-semibold text-gray-900">{order.shippingAddress?.fullName}</p>
                  <p className="text-sm text-zinc-900 leading-relaxed uppercase tracking-wider">
                    {order.shippingAddress?.address}<br/>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state}<br/>
                    {order.shippingAddress?.pincode}
                  </p>
                  <p className="text-xs font-semibold pt-2 border-t border-gray-200 mt-2">
                    Phone: {order.shippingAddress?.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-800 flex items-center gap-2">
                  <CreditCard size={14} /> Payment Method
                </h3>
                <div className="p-6 bg-gray-50 rounded-4xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{order.paymentMethod}</p>
                    <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest mt-1">
                      Status: {order.paymentStatus}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircleIcon />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Components
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default OrderDetails;