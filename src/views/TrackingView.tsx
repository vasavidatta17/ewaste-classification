import React, { useState, useEffect } from 'react';
import { User, Booking, BookingStatus } from '../types';
import { getBookings, getBookingById, updateBookingStatus, getUserBookings } from '../utils/storage';
import { GreenCertificateModal } from '../components/GreenCertificateModal';
import { useToast } from '../components/Toast';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  RotateCw,
  Award,
  Calendar,
  MapPin,
  AlertCircle,
  PlayCircle,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface TrackingViewProps {
  setActiveView: (view: string) => void;
  currentUser: User | null;
  initialBookingId?: string;
}

const LIFECYCLE_STAGES: { status: BookingStatus; title: string; desc: string; icon: any }[] = [
  {
    status: 'Booking Created',
    title: 'Booking Created',
    desc: 'E-waste registration token generated in central dispatch database.',
    icon: Calendar
  },
  {
    status: 'Pickup Scheduled',
    title: 'Pickup Scheduled',
    desc: 'Assigned to field logistics agent. Doorstep inspection slot locked.',
    icon: Clock
  },
  {
    status: 'Picked Up',
    title: 'Picked Up',
    desc: 'Doorstep digital weighing completed. Items transferred into safe containment vehicle.',
    icon: Truck
  },
  {
    status: 'At Recycling Center',
    title: 'At Recycling Center',
    desc: 'Arrived at state-authorized regional e-waste sorting facility.',
    icon: RotateCw
  },
  {
    status: 'Recycling in Progress',
    title: 'Recycling in Progress',
    desc: 'Hazardous parts isolated; automated component dismantling & PCB smelting active.',
    icon: RotateCw
  },
  {
    status: 'Recycled',
    title: 'Recycled & Certified',
    desc: 'Zero-landfill processing complete. Green Certificate & final reward disbursed.',
    icon: Award
  }
];

export const TrackingView: React.FC<TrackingViewProps> = ({
  setActiveView,
  currentUser,
  initialBookingId
}) => {
  const toast = useToast();
  const [searchInput, setSearchInput] = useState<string>(initialBookingId || '');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState<boolean>(false);

  const userBookings = currentUser ? getUserBookings(currentUser.id) : [];

  const handleSearch = (idToSearch?: string) => {
    const term = (idToSearch || searchInput).trim();
    if (!term) {
      toast.error('Input Required', 'Please enter a valid Booking Reference ID (e.g. EW20260001).');
      return;
    }

    setHasSearched(true);
    const found = getBookingById(term);
    if (found) {
      setActiveBooking(found);
      setSearchInput(found.id);
    } else {
      setActiveBooking(null);
      toast.error('Booking Not Found', `No pickup record located with ID "${term}".`);
    }
  };

  useEffect(() => {
    if (initialBookingId) {
      handleSearch(initialBookingId);
    } else if (userBookings.length > 0 && !activeBooking) {
      // Auto load first user booking if available
      setActiveBooking(userBookings[0]);
      setSearchInput(userBookings[0].id);
      setHasSearched(true);
    } else {
      // Load default demo booking
      const all = getBookings();
      if (all.length > 0) {
        setActiveBooking(all[0]);
        setSearchInput(all[0].id);
        setHasSearched(true);
      }
    }
  }, [initialBookingId]);

  // Demo status advancement for evaluator testing
  const handleAdvanceStatus = () => {
    if (!activeBooking) return;
    const stages: BookingStatus[] = [
      'Booking Created',
      'Pickup Scheduled',
      'Picked Up',
      'At Recycling Center',
      'Recycling in Progress',
      'Recycled'
    ];

    const currentIndex = stages.indexOf(activeBooking.status);
    if (currentIndex === -1 || currentIndex >= stages.length - 1) {
      toast.info('Status Complete', 'This booking has already completed the entire recycling lifecycle!');
      return;
    }

    const nextStatus = stages[currentIndex + 1];
    const updated = updateBookingStatus(activeBooking.id, nextStatus);
    if (updated) {
      setActiveBooking(updated);
      toast.success('Lifecycle Advanced', `Status moved to "${nextStatus}".`);
    }
  };

  const getStageStatus = (stageStatus: BookingStatus, currentStatus: BookingStatus) => {
    const stages: BookingStatus[] = [
      'Booking Created',
      'Pickup Scheduled',
      'Picked Up',
      'At Recycling Center',
      'Recycling in Progress',
      'Recycled'
    ];

    if (currentStatus === 'Cancelled') {
      return stageStatus === 'Booking Created' ? 'completed' : 'cancelled';
    }

    const currentIndex = stages.indexOf(currentStatus);
    const stageIndex = stages.indexOf(stageStatus);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          Live Telemetry & Verification
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Track Your E-Waste Recycling Request
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Enter your unique Booking Reference ID (e.g., <strong>EW20260001</strong>) to inspect live collection status, agent dispatch details, facility audit timestamps, and environmental impact.
        </p>
      </div>

      {/* Search Bar & Quick Selector */}
      <div className="max-w-2xl mx-auto space-y-3">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-emerald-500/50 shadow-lg"
        >
          <div className="relative flex-1">
            <input
              id="tracking-search-input"
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value.toUpperCase())}
              placeholder="Enter Booking ID (e.g. EW20260001)"
              className="w-full bg-transparent pl-10 pr-3 py-2.5 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          </div>
          <button
            id="tracking-search-button"
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            Track Status
          </button>
        </form>

        {/* Quick select pills if user has bookings */}
        {userBookings.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500 font-semibold">Your Bookings:</span>
            {userBookings.map(b => (
              <button
                key={b.id}
                onClick={() => {
                  setSearchInput(b.id);
                  handleSearch(b.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                  activeBooking?.id === b.id
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {b.id} ({b.wasteType})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tracking Result View */}
      {activeBooking ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden space-y-8 p-6 sm:p-10 animate-in fade-in duration-200">
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                  {activeBooking.id}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activeBooking.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : activeBooking.status === 'Recycled'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}
                >
                  {activeBooking.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Initiated on <strong>{activeBooking.createdAt}</strong> by <strong>{activeBooking.userName}</strong> ({activeBooking.location})
              </p>
            </div>

            {/* Evaluator demo control button */}
            <div className="flex items-center gap-2">
              {activeBooking.status !== 'Recycled' && activeBooking.status !== 'Cancelled' && (
                <button
                  id="tracking-advance-demo-button"
                  onClick={handleAdvanceStatus}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                  title="Advance status to next stage (MCA Demo Feature)"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-600" />
                  Advance Status (Demo)
                </button>
              )}

              {activeBooking.status === 'Recycled' && (
                <button
                  id="tracking-view-cert-button"
                  onClick={() => setCertificateModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  View Green Certificate
                </button>
              )}
            </div>
          </div>

          {/* 6-Stage Timeline */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recycling Progress Timeline (6 Verified Stages)
            </h3>

            {/* Timeline for Desktop & Mobile */}
            <div className="relative">
              {/* Progress Line */}
              <div className="hidden lg:block absolute top-6 left-8 right-8 h-1 bg-slate-200 -z-0">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${
                      activeBooking.status === 'Cancelled'
                        ? 10
                        : (Math.max(0, LIFECYCLE_STAGES.findIndex(s => s.status === activeBooking.status)) / 5) * 100
                    }%`
                  }}
                ></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 relative z-10">
                {LIFECYCLE_STAGES.map((stage, idx) => {
                  const state = getStageStatus(stage.status, activeBooking.status);
                  const Icon = stage.icon;

                  return (
                    <div
                      key={stage.status}
                      className={`flex flex-col lg:items-center text-left lg:text-center p-4 rounded-2xl transition-all border ${
                        state === 'active'
                          ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : state === 'completed'
                          ? 'bg-slate-50/80 border-slate-200'
                          : 'bg-white border-dashed border-slate-200 opacity-60'
                      }`}
                    >
                      {/* Step Indicator circle */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm mb-3 shadow-xs ${
                          state === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : state === 'active'
                            ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-100 animate-pulse'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {state === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                        Stage {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {stage.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Milestone History & Device Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-100">
            {/* Left: Milestone Audit Log */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Milestone Telemetry
              </h4>

              <div className="space-y-3">
                {activeBooking.statusHistory.map((hist, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{hist.status}</span>
                        <span className="text-[10px] font-mono text-slate-500">{hist.timestamp}</span>
                      </div>
                      <p className="text-slate-600 leading-snug">{hist.note}</p>
                      {hist.location && (
                        <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3" /> Location: {hist.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking Summary Details */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4 text-xs">
              <h4 className="text-sm font-bold text-slate-900">Request Particulars</h4>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Waste Item:</span>
                  <span className="font-bold text-slate-900">{activeBooking.wasteType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Quantity & Condition:</span>
                  <span className="font-bold text-slate-900">{activeBooking.quantity} Units • {activeBooking.condition}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-slate-900">{activeBooking.pickupDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Time Window:</span>
                  <span className="font-bold text-slate-900">{activeBooking.pickupTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Estimated Reward:</span>
                  <span className="font-bold text-emerald-700 text-sm">₹{activeBooking.estimatedReward.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Doorstep Address:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">{activeBooking.address}, {activeBooking.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Record Found</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We could not find any pickup booking registered with reference ID "<strong>{searchInput}</strong>". Please verify the code or check your User Dashboard.
          </p>
          <button
            onClick={() => setActiveView('booking')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
          >
            Create a New Booking
          </button>
        </div>
      ) : null}

      {/* Green Certificate Modal */}
      {certificateModalOpen && activeBooking && (
        <GreenCertificateModal
          booking={activeBooking}
          onClose={() => setCertificateModalOpen(false)}
        />
      )}
    </div>
  );
};
