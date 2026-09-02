import React, { useState } from 'react';
import { loginUser } from '../utils/storage';
import { useToast } from '../components/Toast';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LoginViewProps {
  setActiveView: (view: string) => void;
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ setActiveView, onLoginSuccess }) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFillDemo = () => {
    setEmail('vasavi@example.com');
    setPassword('password');
    setErrorMessage('');
    toast.info('Demo Credentials Loaded', 'Auto-filled demo account for testing.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length !== 8) {
      setErrorMessage('Password must be exactly 8 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = loginUser(email.trim(), password);
      setIsLoading(false);

      if (result.success && result.user) {
        toast.success(`Welcome back, ${result.user.name}!`, 'Logged into your recycling dashboard.');
        onLoginSuccess();
      } else {
        setErrorMessage(result.message || 'Invalid email or password. Please try again.');
        toast.error('Authentication Failed', result.message);
      }
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Account Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Access your pickup bookings, reward credits, and green certificates.
          </p>
        </div>

        {/* Demo Fast-Fill Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              MCA Demo Test Credentials:
            </span>
            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-md shadow-2xs transition-colors"
            >
              1-Click Auto Fill
            </button>
          </div>
          <div className="text-[11px] font-mono text-slate-700 space-y-0.5">
            <div>Email: <strong className="text-emerald-950">vasavi@example.com</strong></div>
            <div>Password: <strong className="text-emerald-950">password</strong> (8 chars)</div>
          </div>
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
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vasavi@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password (8 chars)</label>
              <span className="text-[10px] text-slate-400">Exact length: 8</span>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                maxLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            id="login-submit-button"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer link to signup */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Don't have an account yet?{' '}
          <button
            onClick={() => setActiveView('auth-signup')}
            className="text-emerald-700 font-bold hover:underline"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};
