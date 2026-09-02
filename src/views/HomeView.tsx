import React, { useState } from 'react';
import { User } from '../types';
import { DEVICE_CATEGORIES, calculateClassification } from '../utils/classificationData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Recycle,
  Truck,
  TrendingUp,
  Award,
  CheckCircle2,
  CalendarCheck,
  Search,
  Zap,
  MapPin,
  ChevronRight,
  Layers,
  Leaf
} from 'lucide-react';

interface HomeViewProps {
  setActiveView: (view: string) => void;
  currentUser: User | null;
  onQuickClassify?: (categoryId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveView, currentUser, onQuickClassify }) => {
  const [quickCategory, setQuickCategory] = useState<string>('laptop');
  const [quickCondition, setQuickCondition] = useState<'Working' | 'Partially Working' | 'Not Working' | 'Damaged'>('Working');

  const quickResult = calculateClassification(quickCategory, quickCondition, 1);

  const stats = [
    { value: '1,250+', label: 'Devices Collected', icon: Recycle, sub: 'Across Andhra Pradesh & Telangana' },
    { value: '850+', label: 'Happy Users', icon: Award, sub: 'Households & Tech Offices' },
    { value: '620+', label: 'Devices Recycled', icon: ShieldCheck, sub: 'Zero-Landfill Processing' },
    { value: '98%', label: 'Responsible Recycling', icon: TrendingUp, sub: 'CPCB & State PCB Compliant' }
  ];

  const workflowSteps = [
    { num: '01', title: 'Register Account', desc: 'Create your free account with your local address & contact.' },
    { num: '02', title: 'Classify E-Waste', desc: 'Select device category & condition to calculate fair ₹ reward.' },
    { num: '03', title: 'Schedule Pickup', desc: 'Pick your preferred date, morning/evening slot & doorstep location.' },
    { num: '04', title: 'Doorstep Pickup', desc: 'Verified logistics agent arrives, inspects & weighs your devices.' },
    { num: '05', title: 'Certified Recycling', desc: 'Hazard-safe dismantling & material recovery at authorized hubs.' },
    { num: '06', title: 'Track & Earn Rewards', desc: 'Real-time 6-stage lifecycle tracking and instant INR compensation.' }
  ];

  const indianCities = [
    'Guntur',
    'Vijayawada',
    'Amaravati',
    'Visakhapatnam',
    'Tirupati',
    'Hyderabad',
    'Bengaluru',
    'Chennai'
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-12 sm:pt-20 pb-20 sm:pb-28">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[140px]"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>EWASTE CLASSIFICATION & RECYCLING PORTAL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
                Give Your E-Waste a <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400 bg-clip-text text-transparent">
                  Second Life.
                </span>
              </h1>

              <p className="text-base sm:text-xl font-medium text-emerald-100/90 tracking-wide">
                "Classify. Schedule. Recycle. Protect Tomorrow."
              </p>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Safely dispose of your old mobile phones, laptops, batteries, monitors, chargers, and electronics.
                Schedule convenient doorstep pickup across Indian cities, prevent toxic heavy metal pollution, and earn attractive recycling rewards in Indian Rupees (₹).
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-cta-classify"
                  onClick={() => setActiveView('classification')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Recycle className="w-4 h-4" />
                  Classify E-Waste
                </button>

                <button
                  id="hero-cta-book"
                  onClick={() => {
                    if (currentUser) {
                      setActiveView('booking');
                    } else {
                      setActiveView('auth-login');
                    }
                  }}
                  className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 hover:border-emerald-500/40 transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-400" />
                  Book a Pickup
                </button>

                <button
                  id="hero-cta-get-started"
                  onClick={() => {
                    if (currentUser) {
                      setActiveView('dashboard');
                    } else {
                      setActiveView('auth-signup');
                    }
                  }}
                  className="px-5 py-3.5 rounded-xl text-emerald-300 hover:text-white text-xs font-bold hover:bg-emerald-950/40 transition-all flex items-center gap-1.5"
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Service locations strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" /> Active in:
                </span>
                {indianCities.map(city => (
                  <span
                    key={city}
                    className="px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Interactive Quick Classifier Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white leading-tight">Instant Valuation Calculator</h2>
                      <p className="text-[11px] text-slate-400">Preview estimated recycling payout (₹)</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-md border border-emerald-800">
                    Live Demo
                  </span>
                </div>

                {/* Form controls */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Select Device Category
                    </label>
                    <select
                      id="hero-quick-category"
                      value={quickCategory}
                      onChange={e => setQuickCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
                    >
                      {DEVICE_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} (Avg Range ₹{cat.minPrice} – ₹{cat.maxPrice})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Working Condition
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Working', 'Partially Working', 'Not Working', 'Damaged'] as const).map(cond => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => setQuickCondition(cond)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left truncate ${
                            quickCondition === cond
                              ? 'bg-emerald-600 text-white font-bold shadow-xs'
                              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Valuation output box */}
                  <div className="bg-gradient-to-br from-emerald-950/80 to-slate-950 p-4 rounded-2xl border border-emerald-700/40 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-emerald-200">Estimated Value / Reward:</span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400">
                        ₹{quickResult.estimatedMinValue.toLocaleString('en-IN')} – ₹{quickResult.estimatedMaxValue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-emerald-900/60">
                      <span>Carbon offset: ~{quickResult.totalCarbonOffsetKg} kg CO₂e</span>
                      <span className="text-emerald-300 font-semibold">100% Zero Landfill</span>
                    </div>
                  </div>

                  <button
                    id="hero-quick-full-analysis"
                    onClick={() => {
                      if (onQuickClassify) onQuickClassify(quickCategory);
                      setActiveView('classification');
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Open Detailed Classification & Book</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center italic">
                    *Estimated value – actual value verified during doorstep physical assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-2xl hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-800 mt-0.5">
                  {st.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {st.sub}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROBLEM & SOLUTION STATEMENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-4">
              <span>The Problem We Solve</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Toxic E-Waste Accumulation & Informal Dumping
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              Improper disposal of electronic waste such as discarded smartphones, laptops, chargers, lithium batteries, and obsolete computers causes severe ground water contamination and toxic heavy metal emissions (lead, mercury, cadmium).
              Many citizens lack awareness of certified recycling options, while recycling centers struggle to source waste directly from households.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-rose-950 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Over 3.2 Million tonnes of e-waste dumped annually in India
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Informal burning releases carcinogenic dioxins & airborne mercury
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
              <span>Our Solution</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Structured Doorstep Pickup & Circular Economy
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              Our web-based E-Waste Pickup and Recycling Management System connects citizens and enterprises directly with certified state recycling partners. We simplify device classification, calculate transparent INR rewards, schedule free doorstep logistics, and provide end-to-end status tracking.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-emerald-950 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free doorstep pickup with digital weighing & instant reward
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Certified material recovery of gold, copper, silver & lithium
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Streamlined 6-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How E-Waste Recycling Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Disposing of obsolete electronics responsibly has never been easier or more rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-400 hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="text-4xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors absolute top-4 right-4 pointer-events-none">
                {step.num}
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-4 shadow-sm">
                {i + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setActiveView('about')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-5 py-2.5 rounded-xl transition-colors border border-emerald-200/60"
          >
            <span>Learn more about our mission & environmental compliance</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. POPULAR CATEGORIES GRID */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Accepted Electronics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                E-Waste Categories & Fair Payouts
              </h2>
            </div>
            <button
              onClick={() => setActiveView('classification')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors self-start md:self-auto flex items-center gap-1.5"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {DEVICE_CATEGORIES.slice(0, 8).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  if (onQuickClassify) onQuickClassify(cat.id);
                  setActiveView('classification');
                }}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl text-left transition-all hover:-translate-y-1 group"
              >
                <div className="text-xs font-bold text-emerald-400 mb-1">
                  ₹{cat.minPrice} – ₹{cat.maxPrice}
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-emerald-400 group-hover:underline">
                  <span>Classify & book</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Clean Up Your Space and Save the Planet?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Join thousands of eco-conscious citizens in Guntur, Vijayawada, Hyderabad, and across India. Book a free doorstep pickup today and get fair rewards credited.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                if (currentUser) {
                  setActiveView('booking');
                } else {
                  setActiveView('auth-signup');
                }
              }}
              className="px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm rounded-xl shadow-xl hover:shadow-2xl transition-all text-center flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              Schedule Doorstep Pickup
            </button>
            <button
              onClick={() => setActiveView('tracking')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Track Existing Request
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
