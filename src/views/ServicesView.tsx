import React from 'react';
import { User } from '../types';
import {
  Recycle,
  Truck,
  RotateCw,
  Search,
  Coins,
  History,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

interface ServicesViewProps {
  setActiveView: (view: string) => void;
  currentUser: User | null;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ setActiveView, currentUser }) => {
  const services = [
    {
      id: 'classification',
      title: 'E-Waste Classification',
      icon: Recycle,
      tag: 'AI Valuation Matrix',
      description: 'Identify the exact type, component architecture, and operational condition of your obsolete electronic devices. Compute accurate scrap yield and environmental impact indices.',
      features: [
        'Detailed category recognition for 11+ device classes',
        'Working condition multiplier matrix (100% down to 20%)',
        'Hazardous material isolation guidelines (Lead, Mercury, BFR)',
        'Component recovery estimation (Gold, Copper, Cobalt)'
      ],
      ctaText: 'Launch Classifier',
      targetView: 'classification'
    },
    {
      id: 'pickup',
      title: 'Doorstep Pickup',
      icon: Truck,
      tag: 'Zero Hassle Logistics',
      description: 'Schedule convenient doorstep pickup from your residential or commercial location across major Indian cities with flexible morning and evening time slots.',
      features: [
        'Free doorstep collection across Guntur, Vijayawada, Hyderabad & more',
        '4 flexible time slots (9 AM to 6 PM)',
        'Digital calibrated scale weighing at doorstep',
        'Immediate digital receipt & status token generated'
      ],
      ctaText: 'Schedule a Pickup',
      targetView: 'booking'
    },
    {
      id: 'recycling',
      title: 'Responsible Recycling',
      icon: RotateCw,
      tag: 'Zero Landfill Guarantee',
      description: 'Connect collected electronic waste directly with authorized Central Pollution Control Board (CPCB) recycling facilities for safe dismantling, smelting, and resource recovery.',
      features: [
        '100% compliance with E-Waste (Management) Rules 2022',
        'Eco-friendly closed-circuit acid leaching and thermal separation',
        'Heavy metal neutralization preventing groundwater leaching',
        'NIST 800-88 compliant physical data storage sanitization'
      ],
      ctaText: 'View Environmental Standards',
      targetView: 'about'
    },
    {
      id: 'tracking',
      title: 'Pickup Tracking',
      icon: Search,
      tag: 'Live 6-Stage Telemetry',
      description: 'Track the end-to-end progress of your recycling request from initial registration to certified dismantling and final Green Certificate issuance.',
      features: [
        'Unique Booking ID (e.g. EW20260001) instant lookup',
        'Visual interactive 6-stage lifecycle progress bar',
        'Timestamped milestone notes and logistics agent names',
        'Downloadable proof of certified destruction'
      ],
      ctaText: 'Track Your Request',
      targetView: 'tracking'
    },
    {
      id: 'rewards',
      title: 'Recycling Rewards',
      icon: Coins,
      tag: 'Direct INR Payouts',
      description: 'Receive fair, market-linked financial compensation in Indian Rupees (₹) based on device type, age, and functioning components directly via UPI or bank transfer.',
      features: [
        'Transparent formula with no hidden deductions',
        'Higher compensation for working or salvageable motherboards',
        'Instant doorstep payout upon physical inspection',
        'Earn eco-credits towards verified green vouchers'
      ],
      ctaText: 'Calculate Your Rewards',
      targetView: 'classification'
    },
    {
      id: 'history',
      title: 'Recycling History',
      icon: History,
      tag: 'Personal Eco Portfolio',
      description: 'Allow registered users to view their complete audit trail of previous recycling activities, cumulative carbon offset figures, and download official Green Certificates.',
      features: [
        'Comprehensive dashboard of all past & ongoing bookings',
        'Track total carbon offset (kg CO₂e saved)',
        'One-click request cancellation or status monitoring',
        'Verifiable digital Green Disposal Certificates'
      ],
      ctaText: 'Access User Dashboard',
      targetView: 'dashboard'
    }
  ];

  const handleCtaClick = (targetView: string) => {
    if ((targetView === 'booking' || targetView === 'dashboard') && !currentUser) {
      setActiveView('auth-login');
      return;
    }
    setActiveView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          Our Comprehensive Services
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          End-to-End E-Waste Solutions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          From doorstep pickup and scientific valuation to certified dismantling and transparent reward disbursement across India.
        </p>
      </div>

      {/* 6 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(svc => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                    {svc.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {svc.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  id={`service-cta-${svc.id}`}
                  onClick={() => handleCtaClick(svc.targetView)}
                  className="w-full py-3 bg-slate-900 group-hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>{svc.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-lg font-bold text-emerald-300">Are you a Corporate or Institutional Bulk Generator?</h4>
          <p className="text-xs text-slate-300 max-w-xl">
            We offer dedicated enterprise recycling agreements (EPR compliance), bulk inventory assessments, and on-premise hard drive degaussing.
          </p>
        </div>
        <button
          onClick={() => setActiveView('contact')}
          className="shrink-0 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors"
        >
          Contact Enterprise Desk
        </button>
      </div>
    </div>
  );
};
