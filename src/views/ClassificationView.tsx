import React, { useState } from 'react';
import { User, DeviceCondition } from '../types';
import { DEVICE_CATEGORIES, CONDITION_MULTIPLIERS, calculateClassification } from '../utils/classificationData';
import {
  Recycle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Zap,
  Info,
  Layers,
  ArrowRight,
  Leaf,
  Plus,
  Minus,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ClassificationViewProps {
  setActiveView: (view: string) => void;
  currentUser: User | null;
  initialCategoryId?: string;
  onSelectForBooking?: (data: { categoryId: string; categoryName: string; condition: DeviceCondition; quantity: number; estimatedReward: number }) => void;
}

export const ClassificationView: React.FC<ClassificationViewProps> = ({
  setActiveView,
  currentUser,
  initialCategoryId = 'mobile-phone',
  onSelectForBooking
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId);
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>('Working');
  const [quantity, setQuantity] = useState<number>(1);
  const [customBrandModel, setCustomBrandModel] = useState<string>('');

  const result = calculateClassification(selectedCategoryId, selectedCondition, quantity);

  const handleProceedToBooking = () => {
    if (onSelectForBooking) {
      onSelectForBooking({
        categoryId: result.category.id,
        categoryName: customBrandModel.trim() ? `${result.category.name} (${customBrandModel.trim()})` : result.category.name,
        condition: selectedCondition,
        quantity: quantity,
        estimatedReward: result.totalEstimatedReward
      });
    }

    if (currentUser) {
      setActiveView('booking');
    } else {
      setActiveView('auth-login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
          Smart Valuation Engine
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          E-Waste Classification & Reward Estimator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Select your electronic device category, specify the physical condition, and compute the estimated recycling payout in Indian Rupees (₹) alongside environmental impact data.
        </p>
      </div>

      {/* Main Classifier Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Interactive Form Inputs */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-8">
          {/* Step 1: Device Category Grid / Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Select Device Category
              </label>
              <span className="text-xs text-slate-500 font-medium">
                {DEVICE_CATEGORIES.length} Categories Available
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DEVICE_CATEGORIES.map(cat => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cat-select-${cat.id}`}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                        {cat.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 block">
                      ₹{cat.minPrice} – ₹{cat.maxPrice}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Optional Model input */}
            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Optional: Specific Brand or Model (e.g. Dell Inspiron, Samsung Galaxy S21, HP 1020)
              </label>
              <input
                id="classifier-brand-model"
                type="text"
                value={customBrandModel}
                onChange={e => setCustomBrandModel(e.target.value)}
                placeholder="e.g. Lenovo ThinkPad T480 / Redmi Note 10"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Step 2: Device Working Condition */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Device Condition
              </label>
              <span className="text-xs text-emerald-700 font-bold">
                {CONDITION_MULTIPLIERS[selectedCondition].label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(CONDITION_MULTIPLIERS) as DeviceCondition[]).map(cond => {
                const isSelected = selectedCondition === cond;
                const info = CONDITION_MULTIPLIERS[cond];
                return (
                  <button
                    key={cond}
                    id={`cond-select-${cond.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    className={`p-3.5 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{cond}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {Math.round(info.factor * 100)}% Value
                      </span>
                    </div>
                    <p className={`text-[11px] leading-snug ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {info.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Quantity Selection */}
          <div>
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              Number of Items (Quantity)
            </label>

            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 max-w-xs">
              <button
                id="quantity-decrease"
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex-1 text-center">
                <span className="text-lg font-black text-slate-900">{quantity}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Units</span>
              </div>

              <button
                id="quantity-increase"
                type="button"
                onClick={() => setQuantity(prev => Math.min(50, prev + 1))}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Valuation Output & Recommended Disposal Method */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Calculation Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-600/30 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">
                  Classification Summary
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {result.category.name} ({quantity}x)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md font-bold bg-emerald-900/90 text-emerald-300 border border-emerald-700/50">
                {selectedCondition}
              </span>
            </div>

            {/* Price Output */}
            <div className="py-6 space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Estimated Recycling Value (Total):</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight flex items-baseline gap-1">
                <span>₹{result.estimatedMinValue.toLocaleString('en-IN')}</span>
                <span className="text-lg text-slate-400 font-normal">to</span>
                <span>₹{result.estimatedMaxValue.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-medium">
                Target doorstep disbursement: <strong>₹{result.totalEstimatedReward.toLocaleString('en-IN')}</strong> (₹{result.recommendedValue} / unit)
              </p>
            </div>

            {/* Mandatory Demo Disclaimer per specification */}
            <div className="bg-slate-900/80 border border-emerald-800/40 p-3 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Notice:</strong> Estimated value – actual value may vary after doorstep physical and functional inspection.
              </p>
            </div>

            {/* Environmental Impact Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Carbon Offset</span>
                <span className="text-sm font-bold text-emerald-400">~{result.totalCarbonOffsetKg} kg CO₂e</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total E-Waste Weight</span>
                <span className="text-sm font-bold text-emerald-400">~{result.totalWeightKg} kg</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-6">
              <button
                id="classification-proceed-book-button"
                onClick={handleProceedToBooking}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-sm font-extrabold shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Schedule Pickup for this Item</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Pre-fills your pickup booking form instantly.
              </p>
            </div>
          </div>

          {/* Recommended Disposal Method Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-600" /> Recommended Disposal & Recycling Method
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 font-medium">
              {result.category.disposalMethod}
            </p>

            <div className="space-y-2 text-xs">
              <div className="text-slate-700">
                <strong className="text-slate-900 block font-semibold mb-0.5">Recoverable Precious Materials:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {result.category.recoverableMaterials.map((mat, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-md text-[11px] text-slate-700 font-medium border border-slate-200">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-slate-700 pt-1">
                <strong className="text-slate-900 block font-semibold mb-0.5">Hazardous Components Mitigated:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {result.category.hazards.map((hz, i) => (
                    <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded-md text-[11px] font-medium border border-rose-200/60">
                      {hz}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
