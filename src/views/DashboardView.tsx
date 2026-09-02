import React, { useState } from 'react';
import { User, Booking } from '../types';
import { getUserBookings, cancelBooking } from '../utils/storage';
import { GreenCertificateModal } from '../components/GreenCertificateModal';
import { useToast } from '../components/Toast';
import {
  LayoutDashboard,
  CalendarCheck,
  RotateCw,
  Coins,
  Search,
  XCircle,
  Eye,
  Award,
  Leaf,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  AlertTriangle
} from 'lucide-react';

interface DashboardViewProps {
  setActiveView: (view: string) => void;
  currentUser: User | null;
  onSelectBookingForTracking: (bookingId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveView,
  currentUser,
  onSelectBookingForTracking
}) => {
  const toast = useToast();
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);
  const [bookingForCertificate, setBookingForCertificate] = useState<Booking | null>(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('Found another disposal method');

  // Auth gate
  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          User Dashboard Requires Login
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Please log in to your account to view your recycling history, pending doorstep pickups, rewards portfolio, and green certificates.
        </p>
        <button
          onClick={() => setActiveView('auth-login')}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          Login to Continue
        </button>
      </div>
    );
  }

  const bookings = getUserBookings(currentUser.id);

  // Metrics computation
  const totalBookings = bookings.length;
  const pendingPickups = bookings.filter(b => b.status === 'Pickup Scheduled' || b.status === 'Booking Created' || b.status === 'Picked Up').length;
  const completedRecycles = bookings.filter(b => b.status === 'Recycled').length;
  const totalEstimatedRewards = bookings.reduce((sum, b) => (b.status !== 'Cancelled' ? sum + b.estimatedReward : sum), 0);
  const totalCarbonOffsetKg = bookings.reduce((sum, b) => (b.status === 'Recycled' ? sum + (b.quantity * 25) : sum), 0);

  const handleConfirmCancel = () => {
    if (!cancellingBookingId) return;
    const ok = cancelBooking(cancellingBookingId, cancelReason);
    if (ok) {
      toast.info('Booking Cancelled', `Pickup request ${cancellingBookingId} marked as Cancelled.`);
    } else {
      toast.error('Error', 'Failed to cancel booking.');
    }
    setCancellingBookingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-700/30">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Verified Citizen Account
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Welcome, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Registered Location: <strong className="text-emerald-400">{currentUser.location}</strong> • Account ID: <span className="font-mono">{currentUser.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dashboard-new-booking-button"
            onClick={() => setActiveView('booking')}
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            Book New Pickup
          </button>
          <button
            onClick={() => setActiveView('classification')}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all"
          >
            Classify Item
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {totalBookings}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">All registered requests</span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Pickups</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {pendingPickups}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">In dispatch & transit queue</span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Recycles</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
            {completedRecycles}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Certified zero-landfill</span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Rewards</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
            ₹{totalEstimatedRewards.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">INR Doorstep Credits</span>
        </div>
      </div>

      {/* Bookings Table / Card View */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your E-Waste Booking History</h3>
            <p className="text-xs text-slate-500">Manage pickup schedules, review milestone logs, and download official destruction certificates.</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {bookings.length} Record(s) in Local Storage
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">No Pickup Bookings Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't scheduled any electronic waste pickups yet. Classify your old devices and book your first free collection today!
            </p>
            <button
              onClick={() => setActiveView('booking')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Book First Pickup
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">E-Waste Item</th>
                  <th className="py-3.5 px-4">Pickup Date</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Reward (₹)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {b.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <div>{b.wasteType}</div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Qty: {b.quantity} • {b.condition}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{b.pickupDate}</div>
                      <span className="text-[10px] text-slate-400">{b.pickupTime}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 truncate max-w-[150px]">
                      {b.city}, {b.state}
                    </td>
                    <td className="py-3.5 px-4 font-black text-emerald-700">
                      ₹{b.estimatedReward.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'Recycled'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-teal-50 text-teal-800 border border-teal-200'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          id={`dash-view-${b.id}`}
                          onClick={() => setSelectedBookingForDetails(b)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          id={`dash-track-${b.id}`}
                          onClick={() => {
                            onSelectBookingForTracking(b.id);
                            setActiveView('tracking');
                          }}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600 hover:text-emerald-800 transition-colors"
                          title="Track Pickup"
                        >
                          <Search className="w-4 h-4" />
                        </button>
                        {b.status === 'Recycled' && (
                          <button
                            id={`dash-cert-${b.id}`}
                            onClick={() => setBookingForCertificate(b)}
                            className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-700 hover:text-emerald-900 transition-colors"
                            title="Green Certificate"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}
                        {b.status !== 'Recycled' && b.status !== 'Cancelled' && (
                          <button
                            id={`dash-cancel-${b.id}`}
                            onClick={() => setCancellingBookingId(b.id)}
                            className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600 hover:text-rose-800 transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-mono">
                  {selectedBookingForDetails.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Waste Item:</span>
                <span className="font-bold text-slate-900">{selectedBookingForDetails.wasteType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Quantity & State:</span>
                <span className="font-bold text-slate-900">{selectedBookingForDetails.quantity} Units • {selectedBookingForDetails.condition}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Scheduled Date & Slot:</span>
                <span className="font-bold text-slate-900">{selectedBookingForDetails.pickupDate} ({selectedBookingForDetails.pickupTime})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Estimated Reward:</span>
                <span className="font-bold text-emerald-700">₹{selectedBookingForDetails.estimatedReward.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-800">{selectedBookingForDetails.status}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-400 block mb-0.5">Address:</span>
                <span className="font-medium text-slate-800">{selectedBookingForDetails.address}, {selectedBookingForDetails.city}, {selectedBookingForDetails.state} – {selectedBookingForDetails.pincode}</span>
              </div>
              {selectedBookingForDetails.additionalInstructions && (
                <div className="py-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[11px]">
                  <span className="text-slate-400 font-bold block mb-0.5">Notes:</span>
                  <span>{selectedBookingForDetails.additionalInstructions}</span>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onSelectBookingForTracking(selectedBookingForDetails.id);
                  setSelectedBookingForDetails(null);
                  setActiveView('tracking');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Track Live Telemetry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Cancel Doorstep Pickup</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel booking <strong className="font-mono text-slate-900">{cancellingBookingId}</strong>? This will release the allocated logistics slot.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Cancellation</label>
              <select
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
              >
                <option value="Found another disposal method">Found another disposal method</option>
                <option value="Not available at scheduled time slot">Not available at scheduled time slot</option>
                <option value="Entered wrong address / device information">Entered wrong address / device info</option>
                <option value="Will reschedule later">Will reschedule later</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Keep Booking
              </button>
              <button
                id="confirm-cancel-button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Green Certificate Modal */}
      {bookingForCertificate && (
        <GreenCertificateModal
          booking={bookingForCertificate}
          onClose={() => setBookingForCertificate(null)}
        />
      )}
    </div>
  );
};
