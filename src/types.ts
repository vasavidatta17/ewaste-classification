export type DeviceCondition = 'Working' | 'Partially Working' | 'Not Working' | 'Damaged';

export type BookingStatus =
  | 'Booking Created'
  | 'Pickup Scheduled'
  | 'Picked Up'
  | 'At Recycling Center'
  | 'Recycling in Progress'
  | 'Recycled'
  | 'Cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  location: string;
  createdAt: string;
}

export interface StatusHistoryEntry {
  status: BookingStatus;
  timestamp: string;
  note: string;
  location?: string;
}

export interface Booking {
  id: string; // e.g. "EW20260001"
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  wasteType: string;
  category: string;
  quantity: number;
  condition: DeviceCondition;
  pickupDate: string; // "2026-09-05"
  pickupTime: string; // "10:00 AM - 12:00 PM"
  location: string; // e.g. "Guntur, Andhra Pradesh"
  address: string;
  city: string;
  state: string;
  pincode: string;
  additionalInstructions?: string;
  estimatedReward: number; // in INR ₹
  status: BookingStatus;
  createdAt: string;
  statusHistory: StatusHistoryEntry[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  deviceRecycled?: string;
  date: string;
  avatarUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  location?: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Read' | 'Resolved';
}

export interface DeviceCategoryConfig {
  id: string;
  name: string;
  iconName: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  avgWeightKg: number;
  carbonOffsetKg: number;
  hazards: string[];
  recoverableMaterials: string[];
  disposalMethod: string;
}

export interface ClassificationResult {
  category: DeviceCategoryConfig;
  condition: DeviceCondition;
  quantity: number;
  estimatedMinValue: number;
  estimatedMaxValue: number;
  recommendedValue: number;
  totalEstimatedReward: number;
  totalCarbonOffsetKg: number;
  totalWeightKg: number;
  disposalAdvice: string[];
}
