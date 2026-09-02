import React, { useState, useEffect } from 'react';
import { User, DeviceCondition, Booking } from '../types';
import {
  DEVICE_CATEGORIES,
  INDIAN_CITIES,
  INDIAN_STATES,
  TIME_SLOTS,
  calculateClassification
} from '../utils/classificationData';
import { createBooking } from '../utils/storage';
import { useToast } from '../components/Toast';
import confetti from 'canvas-confetti';
import {
  CalendarCheck,
  Truck,
  MapPin,
  Clock,
  Phone,
  Mail,
  User as UserIcon,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  LayoutDashboard,
  Coins,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';

interface BookingViewProps {
  setActiveView: (view: string) => void;
  currentUser: User | null;
  initialBookingData?: {
    categoryId: string;
    categoryName: string;
    condition: DeviceCondition;
    quantity: number;
    estimatedReward: number;
  } | null;
  onBookingComplete?: (booking: Booking) => void;
}

export const BookingView: React.FC<BookingViewProps> = ({
  setActiveView,
  currentUser,
  initialBookingData,
  onBookingComplete
}) => {
  const toast = useToast();

  // Form states
  const [userName, setUserName] = useState<string>(currentUser?.name || '');
  const [userEmail, setUserEmail] = useState<string>(currentUser?.email || '');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '+91 98765 43210');
  const [category, setCategory] = useState<string>(initialBookingData?.categoryId || 'laptop');
  const [wasteTypeCustom, setWasteTypeCustom] = useState<string>(initialBookingData?.categoryName || '');
  const [condition, setCondition] = useState<DeviceCondition>(initialBookingData?.condition || 'Working');
  const [quantity, setQuantity] = useState<number>(initialBookingData?.quantity || 1);

  // Address states
  const [address, setAddress] = useState<string>('Flat 402, Green Meadows, Ring Road');
  const [city, setCity] = useState<string>(currentUser?.location?.split(',')[0]?.trim() || 'Guntur');
  const [state, setState] = useState<string>(currentUser?.location?.split(',')[1]?.trim() || 'Andhra Pradesh');
  const [pincode, setPincode] = useState<string>('522006');

  // Schedule states
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [pickupDate, setPickupDate] = useState<string>(getTomorrowDate());
  const [pickupTime, setPickupTime] = useState<string>(TIME_SLOTS[0]);
  const [additionalInstructions, setAdditionalInstructions] = useState<string>('Please call 10 minutes prior to arrival. Items packed safely.');

  // Form error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Live calculation
  const calc = calculateClassification(category, condition, quantity);

  useEffect(() => {
    if (currentUser) {
      if (!userName) setUserName(currentUser.name);
      if (!userEmail) setUserEmail(currentUser.email);
    }
  }, [currentUser]);

  // Auth protection gate
  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CalendarCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Please Login to Book a Pickup
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Authentication is required to associate pickup logistics, reward payments, and certificate history with your account.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveView('auth-login')}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Login to Your Account
          </button>
          <button
            onClick={() => setActiveView('auth-signup')}
            className="w-full sm:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!userName.trim() || userName.trim().length < 2) {
      errs.userName = 'Full Name is required (minimum 2 characters)';
    }

    if (!userEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      errs.userEmail = 'Please provide a valid email address';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit Indian phone number is required';
    }

    if (!address.trim() || address.trim().length < 5) {
      errs.address = 'Detailed doorstep street address is required';
    }

    if (!city.trim()) {
      errs.city = 'City is required';
    }

    if (!state.trim()) {
      errs.state = 'State is required';
    }

    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) {
      errs.pincode = 'Valid 6-digit Indian PIN code is required (e.g. 522006)';
    }

    if (!pickupDate) {
      errs.pickupDate = 'Pickup date is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Validation Error', 'Please check and fill all mandatory booking fields correctly.');
      return;
    }

    setIsSubmitting(true);

    const categoryObj = DEVICE_CATEGORIES.find(c => c.id === category) || DEVICE_CATEGORIES[0];
    const finalWasteType = wasteTypeCustom.trim() || categoryObj.name;
    const finalLocation = `${city}, ${state}`;

    const newBooking = createBooking({
      userId: currentUser.id,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      phone: phone.trim(),
      wasteType: finalWasteType,
      category: category,
      quantity: Number(quantity),
      condition: condition,
      pickupDate: pickupDate,
      pickupTime: pickupTime,
      location: finalLocation,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      additionalInstructions: additionalInstructions.trim(),
      estimatedReward: calc.totalEstimatedReward
    });

    setIsSubmitting(false);
    setConfirmedBooking(newBooking);
    if (onBookingComplete) onBookingComplete(newBooking);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    toast.success('Pickup Scheduled Successfully!', `Booking ID ${newBooking.id} created.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If confirmed, show Confirmation Card
  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Confirmation Notice
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pickup Scheduled Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Your e-waste collection request has been recorded and assigned to our logistics dispatch queue.
          </p>
        </div>

        {/* Confirmation Ticket Card */}
        <div className="bg-white rounded-3xl border-2 border-emerald-500/40 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">
                Booking Reference ID
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                {confirmedBooking.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
                {confirmedBooking.status}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Waste Type & Quantity</span>
                <span className="text-sm font-bold text-slate-900 block">{confirmedBooking.wasteType}</span>
                <span className="text-slate-600">{confirmedBooking.quantity} Unit(s) • Condition: {confirmedBooking.condition}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Estimated Reward</span>
                <span className="text-xl font-black text-emerald-700 block">₹{confirmedBooking.estimatedReward.toLocaleString('en-IN')}</span>
                <span className="text-[11px] text-slate-500">Payable via UPI / Cash upon doorstep physical verification</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Pickup Schedule</span>
                <span className="text-sm font-bold text-slate-900 block">{confirmedBooking.pickupDate}</span>
                <span className="text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> {confirmedBooking.pickupTime}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Pickup Location</span>
                <span className="text-sm font-bold text-slate-900 block truncate">{confirmedBooking.address}</span>
                <span className="text-slate-600">{confirmedBooking.city}, {confirmedBooking.state} – {confirmedBooking.pincode}</span>
              </div>
            </div>

            {/* Instruction note */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong>Next Steps:</strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Our field pickup representative will call on <strong className="text-slate-900">{confirmedBooking.phone}</strong> before arrival. Please keep your electronic items unplugged and accessible.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setActiveView('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Search className="w-4 h-4" />
                Track Live Status
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  View Dashboard
                </button>

                <button
                  onClick={() => {
                    setConfirmedBooking(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors text-center"
                >
                  Book Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          Doorstep Collection Logistics
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Book an E-Waste Doorstep Pickup
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Schedule hassle-free collection from your home, office, or enterprise across Andhra Pradesh, Telangana, and major Indian cities.
        </p>
      </div>

      <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-8">
          {/* Section 1: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <UserIcon className="w-4 h-4 text-emerald-600" />
              1. Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-user-name"
                  type="text"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  placeholder="e.g. Vasavi Datta"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500 ${
                    errors.userName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                  }`}
                />
                {errors.userName && <p className="text-[10px] text-rose-600 mt-1">{errors.userName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-user-email"
                  type="email"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  placeholder="e.g. vasavi@example.com"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500 ${
                    errors.userEmail ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                  }`}
                />
                {errors.userEmail && <p className="text-[10px] text-rose-600 mt-1">{errors.userEmail}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number (WhatsApp for pickup updates) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500 ${
                    errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                  }`}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              {errors.phone && <p className="text-[10px] text-rose-600 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Section 2: E-Waste Specification */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              2. E-Waste Classification & Quantity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Device Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="booking-category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                >
                  {DEVICE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (₹{c.minPrice} – ₹{c.maxPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Device Condition <span className="text-rose-500">*</span>
                </label>
                <select
                  id="booking-condition"
                  value={condition}
                  onChange={e => setCondition(e.target.value as DeviceCondition)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Working">Working (100% Value)</option>
                  <option value="Partially Working">Partially Working (~65% Value)</option>
                  <option value="Not Working">Not Working (~40% Value)</option>
                  <option value="Damaged">Damaged / Broken (~20% Value)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity (Units) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Device Notes / Brand (Optional)
                </label>
                <input
                  id="booking-custom-brand"
                  type="text"
                  value={wasteTypeCustom}
                  onChange={e => setWasteTypeCustom(e.target.value)}
                  placeholder="e.g. Dell Inspiron 15 + Charger"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Doorstep Pickup Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              3. Pickup Location in India
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Complete Street Address, Flat / House No., Landmark <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="booking-address"
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. Flat 402, Green Meadows Apartment, Beside SBI, Ring Road"
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500 ${
                  errors.address ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                }`}
              />
              {errors.address && <p className="text-[10px] text-rose-600 mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <select
                  id="booking-city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                >
                  {INDIAN_CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  id="booking-state"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  PIN Code <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-pincode"
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="522006"
                  className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500 ${
                    errors.pincode ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                  }`}
                />
                {errors.pincode && <p className="text-[10px] text-rose-600 mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Date & Slot */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              4. Preferred Date & Time Slot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pickup Date <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={pickupDate}
                  onChange={e => setPickupDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Time Slot <span className="text-rose-500">*</span>
                </label>
                <select
                  id="booking-time-slot"
                  value={pickupTime}
                  onChange={e => setPickupTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                >
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Instructions for Logistics Team
              </label>
              <input
                id="booking-instructions"
                type="text"
                value={additionalInstructions}
                onChange={e => setAdditionalInstructions(e.target.value)}
                placeholder="e.g. Ring bell twice, items are on 2nd floor, keep packaging box"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100">
            <button
              id="booking-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-extrabold shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Scheduling Pickup...' : 'Confirm & Schedule Pickup Now'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Booking Calculation Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Live Reward Breakdown
              </span>
              <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800">
                INR (₹) Currency
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Selected Device:</span>
                <strong className="text-white">{calc.category.name}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Unit Condition:</span>
                <strong className="text-white">{condition}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Quantity:</span>
                <strong className="text-white">{quantity} unit(s)</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Doorstep Service Fee:</span>
                <strong className="text-emerald-400 font-bold">FREE (₹0)</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">
                Estimated Payout (Doorstep Credit)
              </span>
              <div className="text-3xl font-black text-emerald-400">
                ₹{calc.totalEstimatedReward.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-slate-400 italic">
                *Estimated value – actual value verified during physical inspection.
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Guaranteed Disposal Standards
              </span>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>• CPCB Authorized & ISO 14001 Compliant</li>
                <li>• NIST 800-88 Data Sanitization Protocol</li>
                <li>• Official Digital Green Certificate Issued</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
