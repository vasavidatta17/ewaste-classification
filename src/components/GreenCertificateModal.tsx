import React from 'react';
import { Booking } from '../types';
import { Award, ShieldCheck, Printer, X, Download, Leaf, CheckCircle2 } from 'lucide-react';

interface GreenCertificateModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const GreenCertificateModal: React.FC<GreenCertificateModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const certNumber = `CERT-IN-${booking.id}-${new Date().getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in zoom-in-95 duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-600/30 relative text-slate-900 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 print:hidden transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-2 border-dashed border-emerald-600/40 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 text-center relative overflow-hidden">
          {/* Watermark Leaf */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Leaf className="w-96 h-96 text-emerald-800" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            CPCB & ISO 14001 Compliant
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Certificate of Responsible E-Waste Disposal
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Certificate ID: <strong className="text-emerald-700">{certNumber}</strong>
          </p>

          <div className="w-24 h-1 bg-emerald-500 mx-auto my-4 rounded-full"></div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            This certifies that the electronic items registered under Booking ID{' '}
            <strong className="text-slate-900 font-bold">{booking.id}</strong> by{' '}
            <strong className="text-emerald-800 font-bold">{booking.userName}</strong> have been safely picked up from{' '}
            <strong>{booking.location}</strong> and directed to zero-landfill, certified material recovery processes.
          </p>

          {/* Item details summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-5 text-left text-xs bg-white/90 p-4 rounded-xl border border-emerald-200/60 shadow-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Waste Category</span>
              <span className="font-semibold text-slate-800 truncate block">{booking.wasteType}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Quantity & State</span>
              <span className="font-semibold text-slate-800">{booking.quantity} Unit(s) • {booking.condition}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Reward Disbursed</span>
              <span className="font-bold text-emerald-700">₹{booking.estimatedReward.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Disposal Date</span>
              <span className="font-semibold text-slate-800">{booking.pickupDate}</span>
            </div>
          </div>

          {/* Environmental metrics badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-emerald-900 font-medium py-2 px-4 rounded-xl bg-emerald-100/60 border border-emerald-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ~35 kg CO₂e Emissions Prevented
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> NIST 800-88 Data Sanitized
            </span>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 mt-6 pt-4 border-t border-slate-200 text-xs">
            <div className="text-left">
              <div className="font-serif italic text-sm text-slate-700 font-bold">Rajesh Varma</div>
              <div className="text-[10px] text-slate-500">Environmental Officer • Guntur Hub</div>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-sm text-emerald-700 font-bold">Dr. K. Srinivas Rao</div>
              <div className="text-[10px] text-slate-500">Authorized Recycling Inspector</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-5 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / Save Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
