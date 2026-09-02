import React, { useState } from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  Search,
  Sparkles,
  Database,
  PhoneCall,
  Recycle,
  HelpCircle,
  MessageSquareQuote
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenStorageInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  currentUser,
  onLogout,
  onOpenStorageInspector
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: HelpCircle },
    { id: 'classification', label: 'E-Waste Classification', icon: Recycle },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'booking', label: 'Book Pickup', icon: CalendarCheck },
    { id: 'tracking', label: 'Track Pickup', icon: Search },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar with Indian helpline & quick action */}
      <div className="bg-emerald-900 text-emerald-100 text-[11px] font-medium py-1 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>India E-Waste Helpdesk: <strong className="text-white">+91 863 234 5678</strong> (Guntur, AP)</span>
          <span className="hidden md:inline text-emerald-400">• ISO 14001 & CPCB Certified Recycling Partner</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenStorageInspector}
            className="flex items-center gap-1 hover:text-emerald-300 transition-colors bg-emerald-800/60 px-2 py-0.5 rounded text-[10px]"
            title="Inspect browser Local Storage database"
          >
            <Database className="w-3 h-3 text-emerald-300" />
            <span className="hidden sm:inline">Local Storage DB</span>
          </button>
          {currentUser ? (
            <span className="text-emerald-200">
              Welcome, <strong className="text-white">{currentUser.name}</strong>
            </span>
          ) : (
            <span className="text-emerald-300 hidden sm:inline">Earn rewards for responsible disposal</span>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-hidden"
            id="nav-brand-logo"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold shadow-2xs border border-emerald-200/60'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons for Desktop */}
          <div className="hidden xl:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  id="nav-user-menu-button"
                  onClick={() => setUserDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 font-medium text-xs transition-all shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold max-w-[100px] truncate">{currentUser.name}</span>
                </button>

                {/* Dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <p className="text-[10px] text-emerald-600 font-medium mt-0.5">{currentUser.location}</p>
                    </div>

                    <button
                      id="dropdown-dashboard-link"
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      User Dashboard
                    </button>

                    <button
                      id="dropdown-booking-link"
                      onClick={() => handleNavClick('booking')}
                      className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-emerald-600" />
                      Book a Pickup
                    </button>

                    <button
                      id="dropdown-tracking-link"
                      onClick={() => handleNavClick('tracking')}
                      className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 transition-colors"
                    >
                      <Search className="w-4 h-4 text-emerald-600" />
                      Track My Pickups
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        id="dropdown-logout-button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-button"
                  onClick={() => handleNavClick('auth-login')}
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  id="nav-signup-button"
                  onClick={() => handleNavClick('auth-signup')}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex xl:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs"
                title="Go to Dashboard"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-150 shadow-xl max-h-[85vh] overflow-y-auto">
          {currentUser && (
            <div className="p-3 mb-2 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-600">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded-md"
              >
                Dashboard
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  id="mobile-nav-dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 px-4 text-center font-bold text-xs text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard & History
                </button>
                <button
                  id="mobile-nav-logout"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 px-4 text-center font-bold text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="mobile-nav-login"
                  onClick={() => handleNavClick('auth-login')}
                  className="py-2.5 px-4 text-center font-bold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Login
                </button>
                <button
                  id="mobile-nav-signup"
                  onClick={() => handleNavClick('auth-signup')}
                  className="py-2.5 px-4 text-center font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
