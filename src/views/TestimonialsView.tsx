import React, { useState, useEffect } from 'react';
import { User, Testimonial } from '../types';
import { getReviews, addReview } from '../utils/storage';
import { useToast } from '../components/Toast';
import {
  Star,
  Quote,
  Plus,
  CheckCircle2,
  MapPin,
  Sparkles,
  MessageSquareQuote,
  X,
  Send
} from 'lucide-react';

interface TestimonialsViewProps {
  currentUser: User | null;
  setActiveView: (view: string) => void;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ currentUser, setActiveView }) => {
  const toast = useToast();
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // Review Form state
  const [name, setName] = useState(currentUser?.name || '');
  const [location, setLocation] = useState(currentUser?.location || 'Guntur, Andhra Pradesh');
  const [deviceRecycled, setDeviceRecycled] = useState('Old Laptop & Smartphone');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const loadReviews = () => {
    setReviews(getReviews());
  };

  useEffect(() => {
    loadReviews();

    const handleReviewsChange = () => loadReviews();
    window.addEventListener('ewaste_reviews_change', handleReviewsChange);
    return () => window.removeEventListener('ewaste_reviews_change', handleReviewsChange);
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name Required', 'Please enter your full name.');
      return;
    }

    if (!reviewText.trim() || reviewText.trim().length < 10) {
      toast.error('Review Required', 'Please write at least 10 characters describing your recycling experience.');
      return;
    }

    addReview({
      name: name.trim(),
      location: location.trim() || 'Andhra Pradesh, India',
      rating,
      review: reviewText.trim(),
      deviceRecycled: deviceRecycled.trim()
    });

    toast.success('Review Submitted', 'Thank you for sharing your e-waste recycling feedback!');
    setWriteModalOpen(false);
    setReviewText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          Community Feedback & Stories
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          What Eco-Conscious Citizens Say
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Read genuine experiences from citizens and organizations across Guntur, Hyderabad, Vijayawada, and Visakhapatnam who chose responsible electronics recycling.
        </p>

        <div className="pt-2">
          <button
            id="open-write-review-button"
            onClick={() => setWriteModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Share Your Recycling Experience
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {reviews.map(t => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative group"
          >
            <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6 pointer-events-none group-hover:text-emerald-200 transition-colors" />

            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= t.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200 fill-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{t.review}"
              </p>

              {t.deviceRecycled && (
                <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60">
                  Recycled: {t.deviceRecycled}
                </div>
              )}
            </div>

            {/* User Details footer */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {t.location}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-slate-400 font-mono">
                {t.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-700">
                <MessageSquareQuote className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">Add Your Testimonial</h3>
              </div>
              <button
                onClick={() => setWriteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Vasavi Datta"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Guntur, AP"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Electronic Items Disposed</label>
                <input
                  type="text"
                  value={deviceRecycled}
                  onChange={e => setDeviceRecycled(e.target.value)}
                  placeholder="e.g. Old Laptop, Charger, CRT Monitor"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">({rating} of 5 Stars)</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Review / Experience *</label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Describe the pickup promptness, transparent weighing, and recycling satisfaction..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setWriteModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
