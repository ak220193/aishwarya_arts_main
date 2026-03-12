import React, { forwardRef } from 'react';

const PrintableInvoice = forwardRef(({ order, subtotal, gst, shipping, amountInWords }, ref) => {
  if (!order) return null;

  // Invoice Number Logic: AG-DDMMYYYY-001
  const date = new Date(order.createdAt);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
  console.log("Current Order Data for Invoice:", order);
  const invoiceNo = `AG-${formattedDate}-001`;
  

  // Tax breakdown (2.5% CGST + 2.5% SGST = 5% Total)
  const halfGst = (gst / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  return (
    <div ref={ref} className="bg-white p-10 text-slate-900 w-[210mm] h-auto  mx-auto font-sans text-[10px] leading-tight">
      
      {/* --- TOP HEADER --- */}
      <div className="text-center border-b-2 border-slate-900 pb-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-widest">Tax Invoice</h1>
      </div>

      {/* --- BRANDING & META --- */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <img src="/LogoRevised.png" alt="Aishwarya Arts" className="h-16 object-contain" />
          <div>
            <h2 className="text-xl font-black text-amber-900 leading-none">Aishwarya Arts</h2>
            <p className="text-[8px] font-bold text-slate-600 mt-1 uppercase">
              3/648 , Thuraiyur Road, N. Kosavampatti, Namakkal, Tamilnadu - 637002
            </p>
            <p className="text-[9px] font-semibold mt-1 italic">Authentic Tanjore Handmade Paintings</p>
            <p className="text-[9px] font-semibold mt-1 italic">Crafting Tanjore Masterpieces </p>
            <p className="text-[9px] mt-1 font-bold">GSTIN: <span className="font-mono">33CLWPD1621D1ZH</span></p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl w-60">
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between font-bold"><span className="text-slate-900 uppercase">Invoice No:</span> <span>{invoiceNo}</span></div>
            <div className="flex justify-between font-bold"><span className="text-slate-900 uppercase">Order ID:</span> <span className="font-mono">#{order.orderId}</span></div>
            <div className="flex justify-between"><span className="text-slate-900 font-bold uppercase">Date:</span> <span>{date.toLocaleDateString('en-IN')}</span></div>
            <div className="flex justify-between font-bold"><span className="text-slate-900 uppercase">Payment:</span> <span className="uppercase text-amber-800">{order.paymentMethod}</span></div>
          </div>
        </div>
      </div>

      {/* --- ADDRESSES --- */}
      <div className="grid grid-cols-2 border-2 border-slate-900 rounded-xl overflow-hidden mb-6">
        <div className="p-4 border-r-2 border-slate-900 bg-slate-50/50">
          <h3 className="text-[9px] font-black text-amber-900 uppercase mb-2">Sold By:</h3>
          <p className="font-bold text-sm underline underline-offset-2">Aishwarya Arts - Gallery</p>
          <p className="mt-1 leading-relaxed">
            3/648 , Thuraiyur Road, N. Kosavampatti, Namakkal, <br />
            Tamilnadu - 637002<br />
            Contact: +91 7550152764
          </p>
        </div>
        <div className="p-4">
          <h3 className="text-[9px] font-black text-amber-900 uppercase mb-2">Delivered To / Bill To:</h3>
          <p className="font-bold text-sm underline underline-offset-2">{order.shippingAddress?.fullName}</p>
          <p className="mt-1 leading-relaxed">
            {order.shippingAddress?.address}<br />
            {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}<br />
            Contact: {order.shippingAddress?.phone}
          </p>
        </div>
      </div>

      {/* --- TABLE --- */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-slate-100 border-y-2 border-slate-900 text-[8px] font-black uppercase">
            <th className="py-3 px-1 text-left w-8">S.No</th>
            <th className="py-3 px-2 text-left">Description</th>
            <th className="py-3 px-1 text-center w-8">Qty</th>
            <th className="py-3 px-2 text-right">Rate</th>
            <th className="py-3 px-2 text-right">CGST (2.5%)</th>
            <th className="py-3 px-2 text-right">SGST (2.5%)</th>
            <th className="py-3 px-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems?.map((item, idx) => (
            <tr key={idx} className="border-b border-slate-200">
              <td className="py-3 px-1 text-center align-top">{idx + 1}</td>
              <td className="py-3 px-2 align-top">
                <p className="font-bold text-[10px]">{item.title}</p>
                <div className="mt-1 text-[8px] text-slate-500 space-y-0.5 uppercase">
                  
                  <p>Frame: {item.frame} | </p>
                  <p>Size: {item.size}</p>
                  
                </div>
              </td>
              <td className="py-3 px-1 text-center font-bold align-top">{item.quantity}</td>
              <td className="py-3 px-2 text-right align-top">₹{item.price?.toLocaleString()}</td>
              <td className="py-3 px-2 text-right align-top text-slate-500 italic">Included</td>
              <td className="py-3 px-2 text-right align-top text-slate-500 italic">Included</td>
              <td className="py-3 px-2 text-right font-bold align-top">₹{(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          ))}
          {/* Shipping Charges Row */}
          <tr className="border-b border-slate-200 bg-slate-50/30 font-semibold">
            <td className="py-3 px-1 text-center italic">-</td>
            <td className="py-3 px-2 italic text-slate-600">Shipping & Handling Charges</td>
            <td className="py-3 px-1 text-center">1</td>
            <td className="py-3 px-2 text-right">₹{shipping.toLocaleString()}</td>
            <td className="py-3 px-2 text-right italic text-slate-400">0%</td>
            <td className="py-3 px-2 text-right italic text-slate-400">0%</td>
            <td className="py-3 px-2 text-right font-bold">₹{shipping.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      {/* --- SUMMARY & BANK --- */}
      <div className="flex justify-between items-start gap-8 mb-8">
        <div className="flex-1 space-y-4">
          <div>
            <h4 className="text-[9px] font-black text-slate-400 uppercase mb-1">Amount in Words</h4>
            <p className="text-[10px] font-bold italic text-slate-800 bg-slate-50 p-3 border border-slate-100 rounded-lg">
              Indian Rupees {amountInWords}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-100">
              <h5 className="text-[8px] font-black uppercase text-amber-900 mb-1">Bank Details</h5>
              <p className="text-[8px] leading-tight">
                <span className="font-bold uppercase">Canara Bank</span><br />
                A/c: 5699723518 | IFSC: CBIN0284000 4461
              </p>
            </div>
            <div className="p-3">
              <h5 className="text-[8px] font-black uppercase text-slate-400 mb-1">Notes</h5>
              <p className="text-[8px] text-slate-500 italic leading-tight">
                100% Handmade Artwork. Goods sold are non-returnable. Subject to Namakkal Jurisdiction.
              </p>
            </div>
          </div>
        </div>

        <div className="w-64 space-y-1.5 border border-slate-100 p-3 rounded-xl bg-slate-50/30">
          <div className="flex justify-between px-1 uppercase font-bold text-[8px] text-slate-900">
            <span>Taxable Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between px-1 uppercase font-bold text-[8px] text-slate-900">
            <span>CGST (2.5%)</span>
            <span>₹{halfGst}</span>
          </div>
          <div className="flex justify-between px-1 uppercase font-bold text-[8px] text-slate-900">
            <span>SGST (2.5%)</span>
            <span>₹{halfGst}</span>
          </div>
          <div className="flex justify-between px-1 uppercase font-bold text-[8px] text-slate-900 ">
            <span>Shipping</span>
            <span>₹{shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center bg-amber-900 text-white p-3 rounded-lg mt-1">
            <span className="text-[10px] font-black uppercase">Grand Total</span>
            <span className="text-lg font-black">₹{order.totalAmount?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="mt-auto flex justify-between items-end px-5 pb-2">
        <div className="text-center w-36">
          <div className="border-b border-slate-300 mb-2 h-6"></div>
          <p className="text-[8px] font-bold uppercase text-slate-400">Customer Signature</p>
        </div>
        <div className="text-center w-56">
          <p className="text-[9px] font-black text-amber-900 uppercase mb-4">For Aishwarya Arts</p>
          <div className="border-b-2 border-slate-900 mb-1"></div>
          <p className="text-[9px] font-black uppercase text-slate-900 tracking-tighter">Authorized Signatory</p>
        </div>
      </div>

      <div className="mt-4 text-center text-[10px] font-semibold text-slate-900 tracking-widest uppercase border-t pt-2">
        Computer Generated Invoice - No Signature Required
      </div>
    </div>
  );
});

PrintableInvoice.displayName = "PrintableInvoice";
export default PrintableInvoice;