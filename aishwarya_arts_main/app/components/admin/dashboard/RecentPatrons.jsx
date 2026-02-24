
"use client";

const RecentPatrons = ({ patrons }) => (
  <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full">
    <h2 className="text-lg font-bold text-zinc-900 mb-6">Recent Customers</h2>
    <div className="space-y-6">
      {patrons.map((patron, i) => (
        <div key={i} className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center font-bold text-amber-700 text-xs">
              {patron.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">{patron.name}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{patron.city}</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-zinc-900">{patron.amount}</p>
        </div>
      ))}
    </div>
    <button className="w-full mt-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-amber-600 hover:text-white transition-all">
      Full Customer Report
    </button>
  </div>
);

export default RecentPatrons;