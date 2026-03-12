"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft, Printer, Package, MapPin,
  CreditCard, Calendar, Loader2,
  Download,
  EyeOff,
  Eye
} from "lucide-react";
import PrintableInvoice from "@/app/components/invoice/InvoiceTemplate";
import { useReactToPrint } from 'react-to-print';



const numberToWords = (num) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
  return str;
};

const OrderDetails = () => {
  const componentRef = useRef(null);
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);


  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Aishwarya_Arts_INV_${order?.orderId}`,
  });

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

  const wordAmount = numberToWords(currentTotal);




  return (
    <div className="min-h-screen bg-gray-50/50 py-10 font-outfit">

      <div className="max-w-5xl mx-auto px-6">

        {/* --- TOP NAVIGATION --- */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link href="/orders" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition">
            <ChevronLeft size={18} /> Back to My Orders
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-zinc-200 text-zinc-900 rounded-xl text-xs font-bold shadow-sm hover:bg-zinc-50 transition"
            >
              {showPreview ? <><EyeOff size={16} /> Close Preview</> : <><Eye size={16} /> Preview Invoice</>}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-zinc-800 transition"
            >
              <Printer size={16} /> Generate Tax Invoice
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="mb-10 bg-white shadow-2xl rounded-3xl overflow-hidden border border-zinc-200 max-h-125 overflow-y-auto">
            <div className="scale-[0.6] origin-top transform -translate-y-12.5">
              <PrintableInvoice
                order={order}
                subtotal={subtotal}
                gst={gst}
                shipping={shipping}
                amountInWords={wordAmount}
              />
            </div>
          </div>
        )}

        {/* --- MAIN ORDER CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-8 lg:p-12 border-b border-gray-50 flex flex-wrap justify-between items-start gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Order Details</h1>
              <p className="text-sm font-mono text-amber-700 font-bold uppercase tracking-widest">
                #{order.orderId?.toUpperCase() || "LOADING..."}
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
                    {order.shippingAddress?.address}<br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
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
            {/* <InvoicePrintView order={order} subtotal={subtotal} gst={gst} shipping={shipping} amountInWords={numberToWords(currentTotal)} /> */}
            
             


                <PrintableInvoice
                  ref={componentRef}
                  order={order}
                  subtotal={subtotal}
                  gst={gst}
                  shipping={shipping}
                  amountInWords={wordAmount}
                />
             
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Components

/* --- INVOICE PRINT VIEW (BILLBOOK STYLE) --- */
// const InvoicePrintView = ({ order, subtotal, gst, shipping, amountInWords }) => (
//   <div className="hidden print:block bg-white p-0 text-zinc-900 font-serif">
//     {/* 1. TOP UTILITY HEADER */}
//     <div className="flex justify-between items-center border-b border-zinc-200 pb-4 mb-6">
//       <div className="flex flex-col">
//         <h1 className="text-3xl font-bold tracking-tighter text-zinc-900">TAX INVOICE</h1>
//         <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Original for Recipient</p>
//       </div>
//       <div className="text-right">
//         <h2 className="text-xl font-bold text-amber-800">Aishwarya Arts</h2>
//         <p className="text-[9px] text-zinc-500 italic">Authentic Tanjore Handmade Paintings</p>
//       </div>
//     </div>

//     {/* 2. TRANSACTION DETAILS GRID */}
//     <div className="grid grid-cols-2 border border-zinc-200 mb-6">
//       <div className="p-4 border-r border-zinc-200">
//         <p className="text-[9px] font-bold text-zinc-400 uppercase mb-2">Sold By (Sender)</p>
//         <div className="text-[11px] space-y-1">
//           <p className="font-bold text-zinc-900">Aishwarya Arts - Tanjore Art Gallery</p>
//           <p>No. 12, Temple View Layout, Namakkal</p>
//           <p>Tamil Nadu, India - 637001</p>
//           <p><span className="font-bold">GSTIN:</span> 33AAAAA0000A1Z5</p>
//           <p><span className="font-bold">Contact:</span> +91 91502 53488</p>
//         </div>
//       </div>
//       <div className="p-4 bg-zinc-50/50">
//         <div className="flex justify-between mb-4">
//           <div>
//             <p className="text-[9px] font-bold text-zinc-400 uppercase">Invoice No</p>
//             <p className="text-xs font-bold text-zinc-900">{order.orderId}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[9px] font-bold text-zinc-400 uppercase">Date</p>
//             <p className="text-xs font-bold text-zinc-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
//           </div>
//         </div>
//         <div>
//           <p className="text-[9px] font-bold text-zinc-400 uppercase">Transport / Courier</p>
//           <p className="text-xs font-semibold text-zinc-900">{order.trackingId ? `BlueDart (${order.trackingId})` : 'To be Dispatched'}</p>
//         </div>
//       </div>
//     </div>

//     {/* 3. CUSTOMER DETAILS */}
//     <div className="border border-zinc-200 border-t-0 p-4 mb-6">
//       <p className="text-[9px] font-bold text-zinc-400 uppercase mb-2">Billed To (Recipient)</p>
//       <div className="grid grid-cols-2">
//         <div className="text-[11px] space-y-1">
//           <p className="font-bold text-zinc-900">{order.shippingAddress?.fullName}</p>
//           <p>{order.shippingAddress?.address}</p>
//           <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
//         </div>
//         <div className="text-right text-[11px] space-y-1">
//           <p><span className="font-bold">Phone:</span> {order.shippingAddress?.phone}</p>
//           <p><span className="font-bold">Email:</span> {order.email}</p>
//           <p><span className="font-bold">Payment Method:</span> {order.paymentMethod}</p>
//         </div>
//       </div>
//     </div>

//     {/* 4. BILLING TABLE */}
//     <table className="w-full border-collapse border border-zinc-200 mb-6">
//       <thead>
//         <tr className="bg-zinc-100 text-[10px] font-bold uppercase border-b border-zinc-200">
//           <th className="p-3 text-left border-r border-zinc-200">#</th>
//           <th className="p-3 text-left border-r border-zinc-200 w-1/2">Description of Goods</th>
//           <th className="p-3 text-center border-r border-zinc-200">HSN</th>
//           <th className="p-3 text-center border-r border-zinc-200">Qty</th>
//           <th className="p-3 text-right border-r border-zinc-200">Rate</th>
//           <th className="p-3 text-right">Amount</th>
//         </tr>
//       </thead>
//       <tbody className="text-[11px]">
//         {order.orderItems?.map((item, i) => (
//           <tr key={i} className="border-b border-zinc-200">
//             <td className="p-3 border-r border-zinc-200">{i + 1}</td>
//             <td className="p-3 border-r border-zinc-200 font-bold">
//               {item.title}
//               <p className="text-[9px] font-normal text-zinc-500 mt-1 uppercase italic">
//                 Handmade Tanjore Painting - Size: {item.size} | Frame: {item.frame}
//               </p>
//             </td>
//             <td className="p-3 text-center border-r border-zinc-200">9701</td>
//             <td className="p-3 text-center border-r border-zinc-200 font-bold">{item.quantity}</td>
//             <td className="p-3 text-right border-r border-zinc-200">₹{item.price?.toLocaleString('en-IN')}</td>
//             <td className="p-3 text-right font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
//           </tr>
//         ))}
//         {/* Placeholder for empty rows to maintain height */}
//         <tr className="h-20"><td className="border-r border-zinc-200"></td><td className="border-r border-zinc-200"></td><td className="border-r border-zinc-200"></td><td className="border-r border-zinc-200"></td><td className="border-r border-zinc-200"></td><td></td></tr>
//       </tbody>
//     </table>

//     {/* 5. TOTALS BLOCK */}
//     <div className="flex justify-between items-start">
//       <div className="w-3/5">
//         <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1 tracking-widest">Amount in Words</p>
//         <p className="text-[11px] font-bold text-zinc-800 italic">Indian Rupees {amountInWords}</p>

//         <div className="mt-8 text-[9px] space-y-1 text-zinc-500 italic">
//           <p className="font-bold text-zinc-800">Terms & Conditions:</p>
//           <p>1. Artwork is handmade; minor variations are part of its authenticity.</p>
//           <p>2. Goods once sold will not be taken back or exchanged.</p>
//           <p>3. Subject to Namakkal Jurisdiction only.</p>
//         </div>
//       </div>

//       <div className="w-1/3 border border-zinc-200">
//         <div className="p-2 border-b border-zinc-200 flex justify-between text-[11px]">
//           <span>Sub-Total:</span><span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
//         </div>
//         <div className="p-2 border-b border-zinc-200 flex justify-between text-[11px]">
//           <span>GST (5%):</span><span className="font-bold">₹{gst.toLocaleString('en-IN')}</span>
//         </div>
//         <div className="p-2 border-b border-zinc-200 flex justify-between text-[11px]">
//           <span>Shipping:</span><span className="font-bold">₹{shipping.toLocaleString('en-IN')}</span>
//         </div>
//         <div className="p-2 bg-zinc-900 text-white flex justify-between text-sm font-bold">
//           <span>Total:</span><span>₹{order.totalAmount?.toLocaleString('en-IN')}</span>
//         </div>
//       </div>
//     </div>

//     {/* 6. SIGNATURE FOOTER */}
//     <div className="mt-20 flex justify-between items-end px-4">
//       <div className="text-center border-t border-zinc-200 pt-2 w-1/4 text-[10px] font-bold uppercase text-zinc-400">
//         Customer Signature
//       </div>
//       <div className="text-center w-1/3 text-[11px]">
//         <p className="font-bold text-zinc-900 uppercase">For Aishwarya Arts</p>
//         <div className="h-16"></div> {/* Space for Stamp/Sign */}
//         <p className="font-bold uppercase tracking-widest text-[9px]">Authorized Signatory</p>
//       </div>
//     </div>
//   </div>
// );

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default OrderDetails;