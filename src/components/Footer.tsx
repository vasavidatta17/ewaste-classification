import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Leaf,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleNav = (viewId: string) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top banner / stats badge */}
        <div className="bg-gradient-to-r from-emerald-900/60 via-slate-800 to-teal-900/60 p-6 rounded-2xl border border-emerald-800/40 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">Join India’s Sustainable Electronics Movement</h3>
              <p className="text-xs sm:text-sm text-slate-400">Doorstep pickups across Guntur, Vijayawada, Hyderabad, Bengaluru, Chennai & beyond.</p>
            </div>
          </div>
          <button
            onClick={() => handleNav('booking')}
            className="shrink-0 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2"
          >
            Schedule Free Pickup
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Logo size="md" variant="dark" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>"Responsible disposal today for a cleaner tomorrow."</strong>
              <br />
              Authorized E-Waste Management and Material Recovery Platform committed to zero-landfill electronic recycling and circular economy.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-emerald-400">
              <span className="inline-flex items-center gap-1 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/50">
                <ShieldCheck className="w-3.5 h-3.5" /> CPCB Authorized
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/50">
                <Award className="w-3.5 h-3.5" /> ISO 14001:2015
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-xs"></span> Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', view: 'home' },
                { label: 'About Us & Mission', view: 'about' },
                { label: 'Services Overview', view: 'services' },
                { label: 'E-Waste Classification', view: 'classification' },
                { label: 'Book Doorstep Pickup', view: 'booking' },
                { label: 'Track Recycling Status', view: 'tracking' },
                { label: 'Testimonials & Reviews', view: 'testimonials' },
                { label: 'Contact Helpdesk', view: 'contact' },
              ].map(link => (
                <li key={link.view}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left text-slate-400"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-600" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-xs"></span> Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>E-Waste Classification:</strong> AI & condition-based value algorithms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Doorstep Pickup:</strong> Safe collection from homes & enterprises.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Certified Recycling:</strong> Zero-landfill segregation & precious metal recovery.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Live Tracking:</strong> Real-time 6-stage lifecycle tracking with ID.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Instant INR Rewards:</strong> Transparent fair payouts in Indian Rupees (₹).</span>
              </li>
            </ul>
          </div>

          {/* Col 4: India Helpdesk & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-xs"></span> Head Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>E-Waste Management Hub, 4th Lane, Ring Road, Guntur, Andhra Pradesh – 522006, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 863 234 5678 / +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@ewaste-recycle.in</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Operating Hours: Mon – Sat: 9:00 AM – 7:00 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 EWASTE Pickup and Recycling Management. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-emerald-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-emerald-400 transition-colors"
            >
              Guntur Hub Location
            </button>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-700 mb-2">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-lg font-bold">
                {modalType === 'privacy' ? 'Data Privacy & E-Waste Policy' : 'Terms & Conditions of Pickup'}
              </h3>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed border-t border-slate-100 pt-3">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Local Storage Security:</strong> In this demo environment, your user profile and booking requests are stored locally in your browser’s Local Storage Web API.
                  </p>
                  <p>
                    <strong>2. Data Sanitization & Destruction:</strong> Every digital storage media (hard drives, solid state drives, internal memory chips) collected during pickup undergoes certified physical degaussing and shredding in accordance with NIST Special Publication 800-88 standards.
                  </p>
                  <p>
                    <strong>3. Environmental Compliance:</strong> All recovered raw materials (copper, silver, gold, lithium) are handled by authorized state pollution control board recyclers.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Doorstep Inspection:</strong> Estimated recycling rewards calculated on this portal are for preliminary classification. Final disbursed INR amount (₹) is verified during on-site weight and condition assessment by our pickup executive.
                  </p>
                  <p>
                    <strong>2. Ownership Confirmation:</strong> By booking a pickup, you affirm that you are the lawful owner of the discarded electronic items and have removed any personal SIM cards or memory cards.
                  </p>
                  <p>
                    <strong>3. Cancellation Policy:</strong> You may cancel or reschedule your pickup anytime prior to agent dispatch via your User Dashboard.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
