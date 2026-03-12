"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Printer,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Form State for Logistics
  const [logistics, setLogistics] = useState({
    status: "",
    partner: "",
    trackingId: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${id}`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const result = await res.json();
        if (result.success) {
          setOrder(result.data);
          setLogistics({
            status: result.data.orderStatus,
            partner: result.data.logisticsPartner || "",
            trackingId: result.data.trackingId || "",
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleUpdateFulfillment = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logistics),
      });
      if (res.ok) alert("Fulfillment details updated & Customer notified.");
    } catch (err) {
      alert("Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-zinc-900 mb-4" size={32} />
        <span className="text-zinc-400 font-semibold tracking-widest text-[10px] uppercase">
          Loading Masterpiece Data...
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 lg:p-12 font-outfit text-zinc-900">
      {/* --- TOP NAVIGATION --- */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 text-zinc-900 hover:text-zinc-900 transition-all font-semibold text-sm"
        >
          <ArrowLeft size={18} /> Back to Orders
        </Link>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50 shadow-sm transition-all">
            <Printer size={14} /> Print Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT: ORDER & ITEMS (2 COLS) --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Brief */}
          <div className="bg-white p-8 rounded-4xl border border-zinc-200/60 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  Order {order.orderId}
                </h2>
                <p className="text-zinc-900 text-sm font-medium mt-1 tracking-wide italic">
                  Placed on {new Date(order.createdAt).toDateString()}
                </p>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border uppercase tracking-widest ${
                  order.paymentStatus === "Paid"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-red-50 text-red-600 border-red-100"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            {/* Item List */}
            <div className="space-y-4">
              {order.orderItems?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 group"
                >
                  <div className="w-30 h-30 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-900 text-sm uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-900 font-medium mt-1 italic uppercase">
                      {item.frame} | {item.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-zinc-900 tracking-tight">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-900 font-medium tracking-widest uppercase">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Detail Card */}
          <div className="bg-white p-8 rounded-4xl border border-zinc-200/60 shadow-sm">
            <h3 className="text-sm font-semibold  tracking-wide text-zinc-900 mb-6 flex items-center gap-2">
              <MapPin size={14} /> Destination Information
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-md underline font-semibold text-zinc-900  tracking-wide mb-1">
                  Receiver
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-sm font-medium text-zinc-900 mt-1">
                  {order.email}
                </p>
                <p className="text-sm font-medium text-zinc-900 mt-1">
                  {order.shippingAddress.phone}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-1">
                  Address
                </p>
                <p className="text-sm font-medium text-zinc-900 leading-relaxed">
                  {order.shippingAddress.address},<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: LOGISTICS CONTROL (1 COL) --- */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-4xl border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] sticky top-8">
            <h3 className="text-md font-semibold uppercase tracking-widest text-zinc-900 mb-8 flex items-center gap-2">
              <Truck size={26} className="text-zinc-900" /> Fulfillment Panel
            </h3>

            <div className="space-y-6">
              {/* Status Update */}
              <div>
                <label className="text-sm font-semibold text-zinc-900 uppercase tracking-widest block mb-2">
                  Order Status
                </label>
                <select
                  value={logistics.status}
                  onChange={(e) =>
                    setLogistics({ ...logistics, status: e.target.value })
                  }
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-zinc-900 outline-none"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Logistics Partner */}
              <div>
                <label className="text-sm font-semibold text-zinc-900 uppercase tracking-widest block mb-2">
                  Carrier Partner
                </label>
                <input
                  type="text"
                  placeholder="e.g. BlueDart, Delhivery"
                  value={logistics.partner}
                  onChange={(e) =>
                    setLogistics({ ...logistics, partner: e.target.value })
                  }
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
                />
              </div>

              {/* Tracking ID */}
              <div>
                <label className="text-sm font-semibold text-zinc-900 uppercase tracking-widest block mb-2">
                  Tracking Identifier
                </label>
                <input
                  type="text"
                  placeholder="Enter Tracking ID"
                  value={logistics.trackingId}
                  onChange={(e) =>
                    setLogistics({ ...logistics, trackingId: e.target.value })
                  }
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-semibold font-mono focus:ring-1 focus:ring-zinc-900 outline-none transition-all uppercase"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleUpdateFulfillment}
                  disabled={updating}
                  className="w-full py-4 bg-zinc-900 text-white rounded-2xl text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <Save size={14} />
                  )}
                  Complete Fulfillment
                </button>
                <p className="text-sm text-zinc-900 text-center mt-4 italic font-medium">
                  Updating will trigger a notification to the patron.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
