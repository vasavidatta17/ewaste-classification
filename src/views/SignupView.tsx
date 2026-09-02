import React, { useState } from 'react';
import { registerUser, setCurrentUser } from '../utils/storage';
import { INDIAN_CITIES, INDIAN_STATES } from '../utils/classificationData';
import { useToast } from '../components/Toast';
import {
  UserPlus,
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound
} from 'lucide-react';

interface SignupViewProps {
  setActiveView: (view: string) => void;
  onSignupSuccess: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ setActiveView, onSignupSuccess }) => {
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [city, setCity] = useState('Guntur');
  const [state, setState] = useState('Andhra Pradesh');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Full name must be at least 2 characters.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length !== 8) {
      setErrorMessage('Password must be exactly 8 characters long as required.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const location = `${city}, ${state}`;
      const result = registerUser({
        name: name.trim(),
        email: email.trim(),
        password: password,
        phone: phone.trim() || '+91 98765 00000',
        location: location
      });

      setIsLoading(false);

      if (result.success && result.user) {
        // Auto sign in user upon successful registration
        setCurrentUser(result.user);
        toast.success('Account Created Successfully!', `Welcome to E-Waste Management, ${result.user.name}.`);
        onSignupSuccess();
      } else {
        setErrorMessage(result.message);
        toast.error('Registration Failed', result.message);
      }
    }, 300);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
            <UserPlus className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create Citizen Account
          </h1>
          <p className="text-xs text-slate-500">
            Join thousands of citizens responsibly recycling electronic waste across India.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="signup-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Vasavi Datta"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. vasavi@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">
                Password <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-emerald-700 font-bold">Must be exactly 8 characters</span>
            </div>
            <div className="relative">
              <input
                id="signup-password"
                type="password"
                required
                maxLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="8 characters (e.g. password)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
              <span>Current length: {password.length} / 8</span>
              {password.length === 8 && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Valid length
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Phone Number (WhatsApp for pickup updates)
            </label>
            <div className="relative">
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">City</label>
              <select
                id="signup-city"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                {INDIAN_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">State</label>
              <select
                id="signup-state"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            id="signup-submit-button"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-2"
          >
            <span>{isLoading ? 'Creating Account...' : 'Register & Enter Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer link to login */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Already registered?{' '}
          <button
            onClick={() => setActiveView('auth-login')}
            className="text-emerald-700 font-bold hover:underline"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
