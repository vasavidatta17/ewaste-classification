import React, { useState } from 'react';
import { saveContactMessage } from '../utils/storage';
import { useToast } from '../components/Toast';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Building,
  ShieldCheck,
  Globe
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is doorstep e-waste pickup completely free?',
      a: 'Yes! Residential and standard corporate doorstep pickups are 100% free of charge. In addition, you receive fair cash or UPI rewards in Indian Rupees (₹) based on the inspected type and condition of your electronics.'
    },
    {
      q: 'What happens to the personal data on my recycled laptops and smartphones?',
      a: 'We adhere to stringent NIST 800-88 sanitization standards. Storage drives are either wiped using Department of Defense standard multi-pass magnetic clearing or physically shredded into sub-2mm fragments to guarantee zero data leakage.'
    },
    {
      q: 'Do you provide an official Green Recycling Certificate?',
      a: 'Yes! Once your e-waste reaches our state-authorized recycling center and is processed, a verifiable digital Green Disposal & Carbon Offset Certificate is issued directly to your account with a unique verification token.'
    },
    {
      q: 'Which cities do you currently operate doorstep collections in?',
      a: 'We operate active daily collection fleets across Guntur, Vijayawada, Amaravati, Hyderabad, Visakhapatnam, Bengaluru, Chennai, Mumbai, and Delhi NCR.'
    },
    {
      q: 'Can I recycle non-functional or broken electronics?',
      a: 'Absolutely. We accept devices in any state (Working, Partially Working, Not Working, or Physically Damaged). Non-functional items are safely dismantled to recover precious metals like Gold, Silver, and Copper while isolating hazardous toxins.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Required Fields Missing', 'Please fill out your name, email, and inquiry message.');
      return;
    }

    saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim() || 'General Inquiry',
      message: message.trim()
    });

    setIsSent(true);
    toast.success('Inquiry Submitted', 'Our logistics and recycling support desk will respond within 24 business hours.');
    setName('');
    setEmail('');
    setPhone('+91 ');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          Citizen & Enterprise Support
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Get in Touch With Our Recycling Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have questions about doorstep pickup logistics, bulk corporate disposal, or official CPCB compliance certificates? We are here to help.
        </p>
      </div>

      {/* Contact Grid: Info Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-emerald-700/30">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                National Support Hub
              </span>
              <h3 className="text-xl font-bold text-white">
                Official Helpdesk & Facility
              </h3>
              <p className="text-xs text-slate-400">
                Central Pollution Control Board (CPCB) Registered E-Waste Aggregator
              </p>
            </div>

            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Headquarters & Sorting Facility</span>
                  <span className="text-slate-100 font-medium leading-relaxed block mt-0.5">
                    Eco Green Tower, Ring Road, Guntur, Andhra Pradesh – 522006, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Toll-Free Helpline / WhatsApp</span>
                  <a href="tel:+919876543210" className="text-emerald-300 hover:text-emerald-200 font-mono font-bold block mt-0.5">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Email Desk</span>
                  <a href="mailto:support@ewaste-recycling.in" className="text-emerald-300 hover:text-emerald-200 font-medium block mt-0.5">
                    support@ewaste-recycling.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Operating Hours</span>
                  <span className="text-slate-200 block mt-0.5">
                    Monday – Saturday: 9:00 AM – 6:00 PM IST
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                Operational Collection Nodes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Guntur', 'Vijayawada', 'Amaravati', 'Hyderabad', 'Visakhapatnam', 'Bengaluru', 'Chennai'].map(c => (
                  <span key={c} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="pb-4 mb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Send an Inquiry Message</h3>
            <p className="text-xs text-slate-500">
              Fill in your details below and our team will get in touch with you shortly.
            </p>
          </div>

          {isSent && (
            <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been safely saved in the support queue.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Vasavi Datta"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. vasavi@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Inquiry Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Bulk Corporate IT Asset Disposal"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Your Message / Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe your query, pickup requirements, device inventory, or corporate EPR certification needs..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                id="contact-submit-button"
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Knowledge Base
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Clear, transparent answers regarding safety protocols, valuations, and compliance.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
