import React from 'react';
import {
  ShieldAlert,
  Leaf,
  Target,
  Sparkles,
  Recycle,
  Lock,
  Cpu,
  Flame,
  CheckCircle2,
  FileText,
  Building,
  UserCheck,
  ChevronRight
} from 'lucide-react';

interface AboutViewProps {
  setActiveView: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveView }) => {
  const toxicMaterials = [
    {
      name: 'Lead (Pb)',
      source: 'Found in CRT monitors, printed circuit boards solder, and glass funnels.',
      impact: 'Damages central nervous system, kidneys, and impairs child neurological development when leached into groundwater.'
    },
    {
      name: 'Mercury (Hg)',
      source: 'Found in cold cathode fluorescent lamps (CCFL), LCD backlights, and relays.',
      impact: 'Bioaccumulates in food chains and aquatic life, causing chronic cognitive and motor impairment.'
    },
    {
      name: 'Cadmium (Cd)',
      source: 'Present in rechargeable NiCd batteries, SMD chip resistors, and infrared detectors.',
      impact: 'Extremely toxic to bone density and pulmonary function; classified as a human carcinogen.'
    },
    {
      name: 'Brominated Flame Retardants (BFR)',
      source: 'Plastic casings of laptops, televisions, printers, and circuit boards.',
      impact: 'Releases highly toxic dioxins and furans when incinerated open-air in unorganized scrap yards.'
    }
  ];

  const recoveryMaterials = [
    { name: 'Gold (Au)', purity: '99.9%', use: 'High-speed microprocessor pins and memory contacts' },
    { name: 'Silver (Ag)', purity: '99.5%', use: 'Conductive traces and ceramic capacitors' },
    { name: 'Copper (Cu)', purity: '99.8%', use: 'Transformer windings, coaxial cables, and heat pipes' },
    { name: 'Lithium (Li)', purity: '98.5%', use: 'Re-synthesized into EV and electronics battery precursors' }
  ];

  const workflowSteps = [
    {
      step: '1',
      title: 'Register',
      desc: 'Create an account using your verified email, phone number, and Indian residential or commercial address.'
    },
    {
      step: '2',
      title: 'Classify Your E-Waste',
      desc: 'Specify your discarded items (e.g., laptop, smartphone, charger) and select physical condition to calculate fair value.'
    },
    {
      step: '3',
      title: 'Schedule Pickup',
      desc: 'Choose convenient date & time slot for our certified logistics team to visit your doorstep.'
    },
    {
      step: '4',
      title: 'Doorstep Pickup',
      desc: 'Our agent arrives, performs digital weighing, confirms device condition, and issues immediate digital confirmation.'
    },
    {
      step: '5',
      title: 'Certified Recycling',
      desc: 'Items are securely dismantled, toxic parts segregated, and precious metals extracted in zero-landfill centers.'
    },
    {
      step: '6',
      title: 'Track Progress & Rewards',
      desc: 'Follow your booking through 6 verified stages on our real-time tracker and receive your official Green Certificate.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          About E-Waste Management Platform
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Driving India's Transition to a <br />
          <span className="text-emerald-600">Zero-Landfill Circular Future</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Bridging the gap between conscious citizens, corporate enterprises, and state-authorized recyclers across Andhra Pradesh, Telangana, and throughout India.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            <strong>"To make responsible e-waste disposal simple, accessible, and convenient."</strong>
          </p>
          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            We aim to eliminate informal e-waste dumping by empowering every citizen with free doorstep pickups, fair transparent compensation in Indian Rupees (₹), and 100% verified regulatory compliance.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Why E-Waste Recycling Matters</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            India is currently the 3rd largest generator of electronic waste globally. Over 90% of discarded electronics currently end up in informal scrap yards where dangerous open-air acid leaching and incineration poison local communities.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CPCB Guidelines
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> E-Waste Rules 2022
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ISO 14001 Standards
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> NIST 800-88 Data Sanitization
            </div>
          </div>
        </div>
      </div>

      {/* Hazardous Materials Breakdown */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
            Toxicity & Hazard Mitigation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Why Electronics Cannot Be Thrown in Household Trash
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Common gadgets harbor hazardous heavy metals that must be processed inside certified negative-pressure filtration facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {toxicMaterials.map((mat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs hover:border-rose-300 hover:shadow-md transition-all space-y-2.5"
            >
              <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                <ShieldAlert className="w-5 h-5" />
                <span>{mat.name}</span>
              </div>
              <div className="text-xs text-slate-500">
                <strong className="text-slate-700">Origin:</strong> {mat.source}
              </div>
              <div className="text-xs text-rose-950 font-medium bg-rose-50/70 p-2.5 rounded-xl border border-rose-100">
                <strong className="text-rose-800">Health Risk:</strong> {mat.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resource Recovery & Data Security Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resource Recovery */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Urban Mining & Resource Recovery</h3>
              <p className="text-xs text-emerald-300">Recovering scarce earth elements without mining</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            One metric ton of printed circuit boards contains up to <strong>40 times more gold</strong> and <strong>10 times more copper</strong> than one metric ton of raw mined ore. By recycling, we preserve natural ecosystems and lower global carbon output.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {recoveryMaterials.map((rec, i) => (
              <div key={i} className="bg-slate-900/80 border border-emerald-800/60 p-3 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">{rec.name}</span>
                  <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300">{rec.purity}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">{rec.use}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Security Awareness */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">NIST 800-88 Data Security</h3>
                <p className="text-xs text-slate-500">Guaranteed complete digital sanitization</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              We understand your digital privacy concerns. Many users hesitate to recycle old laptops or phones due to fears of personal data recovery.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Multi-Pass Degaussing:</strong> High-flux electromagnetic clearing for magnetic media.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Physical Shredding:</strong> Mechanical shredding of flash memory into sub-2mm particles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Destruction Certificate:</strong> Automated certificate generation for your peace of mind.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveView('booking')}
            className="w-full py-3 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <span>Schedule a Secure Pickup</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* How It Works Detailed Workflow */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Step-by-Step Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            An end-to-end lifecycle designed for seamless user convenience and full auditability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map(st => (
            <div
              key={st.step}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {st.step}
                </span>
                <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Phase {st.step}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{st.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => setActiveView('classification')}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all inline-flex items-center gap-2"
        >
          <Recycle className="w-4 h-4" />
          Start Classifying Your Devices Now
        </button>
      </div>
    </div>
  );
};
