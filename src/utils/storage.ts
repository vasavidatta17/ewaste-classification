import { User, Booking, Testimonial, ContactMessage, BookingStatus } from '../types';

export const STORAGE_KEYS = {
  USERS: 'ewaste_users',
  CURRENT_USER: 'ewaste_current_user',
  BOOKINGS: 'ewaste_bookings',
  CONTACTS: 'ewaste_contacts',
  REVIEWS: 'ewaste_reviews',
  COUNTER: 'ewaste_booking_counter'
};

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'TEST001',
    name: 'Priya Sharma',
    location: 'Guntur, Andhra Pradesh',
    rating: 5,
    review: 'Booking an e-waste pickup was very easy. I could schedule everything online without visiting a recycling center. The pickup team arrived right on time and weighed the old monitors transparently!',
    deviceRecycled: 'Desktop Computer & CRT Monitor',
    date: '2026-08-20'
  },
  {
    id: 'TEST002',
    name: 'Rahul Kumar',
    location: 'Hyderabad, Telangana',
    rating: 5,
    review: 'The classification feature helped me understand how to dispose of my old electronics responsibly. Received ₹2,400 reward for my 2 old laptops directly credited!',
    deviceRecycled: '2x Laptops & Chargers',
    date: '2026-08-22'
  },
  {
    id: 'TEST003',
    name: 'Sneha Reddy',
    location: 'Vijayawada, Andhra Pradesh',
    rating: 4,
    review: 'Simple interface and convenient pickup tracking. Very useful for managing old electronic devices around our apartment society.',
    deviceRecycled: 'Tablet & Power Bank',
    date: '2026-08-25'
  },
  {
    id: 'TEST004',
    name: 'Arjun Rao',
    location: 'Visakhapatnam, Andhra Pradesh',
    rating: 5,
    review: 'I recycled my old laptop through the platform and the booking process was smooth and convenient. Green recycling certificate was generated instantly upon completion.',
    deviceRecycled: 'Gaming Laptop & Peripherals',
    date: '2026-08-28'
  }
];

const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'EW20260001',
    userId: 'DEMO_USER_VASAVI',
    userName: 'Vasavi Datta',
    userEmail: 'vasavi@example.com',
    phone: '+91 98765 43210',
    wasteType: 'Laptop (Gaming Core i7)',
    category: 'laptop',
    quantity: 1,
    condition: 'Working',
    pickupDate: '2026-09-05',
    pickupTime: '10:00 AM – 12:00 PM',
    location: 'Guntur, Andhra Pradesh',
    address: 'Flat 402, Green Meadows, Ring Road',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    pincode: '522006',
    additionalInstructions: 'Please ring bell twice, items packed in cardboard box.',
    estimatedReward: 3400,
    status: 'Pickup Scheduled',
    createdAt: '2026-08-29',
    statusHistory: [
      {
        status: 'Booking Created',
        timestamp: '2026-08-29 09:30 AM',
        note: 'Pickup request registered via online portal',
        location: 'Guntur Hub'
      },
      {
        status: 'Pickup Scheduled',
        timestamp: '2026-08-29 11:15 AM',
        note: 'Assigned to Field Logistics Agent: Rajesh V.',
        location: 'Guntur Central Operations'
      }
    ]
  },
  {
    id: 'EW20260002',
    userId: 'DEMO_USER_VASAVI',
    userName: 'Vasavi Datta',
    userEmail: 'vasavi@example.com',
    phone: '+91 98765 43210',
    wasteType: 'Mobile Phone & 3 Chargers',
    category: 'mobile-phone',
    quantity: 2,
    condition: 'Partially Working',
    pickupDate: '2026-08-24',
    pickupTime: '2:00 PM – 4:00 PM',
    location: 'Guntur, Andhra Pradesh',
    address: 'Flat 402, Green Meadows, Ring Road',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    pincode: '522006',
    additionalInstructions: '',
    estimatedReward: 1650,
    status: 'Recycled',
    createdAt: '2026-08-22',
    statusHistory: [
      { status: 'Booking Created', timestamp: '2026-08-22 10:00 AM', note: 'Request initiated', location: 'Guntur' },
      { status: 'Pickup Scheduled', timestamp: '2026-08-22 01:00 PM', note: 'Slot confirmed', location: 'Guntur' },
      { status: 'Picked Up', timestamp: '2026-08-24 03:10 PM', note: 'Doorstep pickup completed by Agent Suresh', location: 'Guntur' },
      { status: 'At Recycling Center', timestamp: '2026-08-25 11:00 AM', note: 'Checked in at certified e-waste yard', location: 'Amaravati Hub' },
      { status: 'Recycling in Progress', timestamp: '2026-08-26 02:30 PM', note: 'Lithium battery extracted, circuit boards smelted', location: 'Amaravati Plant' },
      { status: 'Recycled', timestamp: '2026-08-27 05:00 PM', note: 'Green Destruction Certificate issued. ₹1,650 reward disbursed.', location: 'Amaravati Plant' }
    ]
  }
];

export function initializeLocalStorage(): void {
  if (typeof window === 'undefined') return;

  // Initialize reviews if empty
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_TESTIMONIALS));
  }

  // Initialize users if empty (empty array initially, but with optional demo helper)
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUser: User = {
      id: 'USER001',
      name: 'Vasavi',
      email: 'vasavi@example.com',
      password: 'password', // exactly 8 chars
      location: 'Guntur, Andhra Pradesh',
      phone: '+91 98765 43210',
      createdAt: '2026-08-31'
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultUser]));
  }

  // Initialize bookings if empty
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
  }

  // Initialize contacts if empty
  if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));
  }
}

export const initDemoStorage = initializeLocalStorage;

// ----------------- USER HELPERS -----------------

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error parsing users from storage', e);
    return [];
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error parsing current user from storage', e);
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
  // Dispatch custom storage event for instant multi-component reactivity
  window.dispatchEvent(new Event('ewaste_auth_change'));
}

export function registerUser(user: Omit<User, 'id' | 'createdAt'>): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const normalizedEmail = user.email.trim().toLowerCase();

  // Validate duplicate email
  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return {
      success: false,
      message: 'This email address is already registered. Please login instead.'
    };
  }

  // Validate password length (exactly 8 chars per specification)
  if (!user.password || user.password.length !== 8) {
    return {
      success: false,
      message: 'Password must be exactly 8 characters long as required.'
    };
  }

  // Validate name
  if (!user.name || user.name.trim().length < 2) {
    return {
      success: false,
      message: 'Full Name must be at least 2 characters long.'
    };
  }

  const nextIdNum = users.length + 1;
  const newId = `USER${String(nextIdNum).padStart(3, '0')}`;
  const now = new Date().toISOString().split('T')[0];

  const newUser: User = {
    id: newId,
    name: user.name.trim(),
    email: normalizedEmail,
    password: user.password,
    location: user.location.trim() || 'Guntur, Andhra Pradesh',
    phone: user.phone || '+91 98765 00000',
    createdAt: now
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  return {
    success: true,
    message: 'Account created successfully! Please login to continue.',
    user: newUser
  };
}

export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find(u => u.email.toLowerCase() === normalizedEmail && u.password === password);

  if (!found) {
    return {
      success: false,
      message: 'Invalid email or password. Please try again.'
    };
  }

  setCurrentUser(found);
  return {
    success: true,
    message: `Welcome back, ${found.name}!`,
    user: found
  };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

// ----------------- BOOKING HELPERS -----------------

export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error parsing bookings from storage', e);
    return [];
  }
}

export function getUserBookings(userId: string): Booking[] {
  const all = getBookings();
  // Also include demo vasavi bookings if current user is Vasavi
  return all.filter(b => b.userId === userId || (userId === 'USER001' && b.userId === 'DEMO_USER_VASAVI'));
}

export function getBookingById(bookingId: string): Booking | null {
  const all = getBookings();
  const cleanId = bookingId.trim().toUpperCase();
  return all.find(b => b.id.toUpperCase() === cleanId) || null;
}

export function generateBookingId(): string {
  const all = getBookings();
  const currentYear = new Date().getFullYear();
  const count = all.length + 1;
  return `EW${currentYear}${String(count).padStart(4, '0')}`;
}

export function createBooking(bookingData: Omit<Booking, 'id' | 'status' | 'createdAt' | 'statusHistory'>): Booking {
  const all = getBookings();
  const newId = generateBookingId();
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    status: 'Pickup Scheduled',
    createdAt: dateStr,
    statusHistory: [
      {
        status: 'Booking Created',
        timestamp: `${dateStr} ${timeStr}`,
        note: 'Pickup registered successfully by user.',
        location: bookingData.city || 'Regional Hub'
      },
      {
        status: 'Pickup Scheduled',
        timestamp: `${dateStr} ${timeStr}`,
        note: `Scheduled for ${bookingData.pickupDate} during ${bookingData.pickupTime}. Pickup agent will call before arrival.`,
        location: `${bookingData.city}, ${bookingData.state}`
      }
    ]
  };

  all.unshift(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(all));
  window.dispatchEvent(new Event('ewaste_bookings_change'));
  return newBooking;
}

export function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  note?: string,
  location?: string
): Booking | null {
  const all = getBookings();
  const index = all.findIndex(b => b.id.toUpperCase() === bookingId.toUpperCase());
  if (index === -1) return null;

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const defaultNotes: Record<BookingStatus, string> = {
    'Booking Created': 'Booking created in system.',
    'Pickup Scheduled': 'Assigned to field pickup team.',
    'Picked Up': 'Electronic devices collected from doorstep & verified against weight.',
    'At Recycling Center': 'Arrived at state-certified e-waste processing facility.',
    'Recycling in Progress': 'Dismantled, safe hazardous material segregation & PCB extraction in progress.',
    'Recycled': 'Successfully recycled. Green Destruction Certificate & reward generated.',
    'Cancelled': note || 'Pickup cancelled upon user request.'
  };

  const updatedEntry: Booking = {
    ...all[index],
    status: newStatus,
    statusHistory: [
      ...all[index].statusHistory,
      {
        status: newStatus,
        timestamp: `${dateStr} ${timeStr}`,
        note: note || defaultNotes[newStatus],
        location: location || `${all[index].city || 'Recycling Center'}`
      }
    ]
  };

  all[index] = updatedEntry;
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(all));
  window.dispatchEvent(new Event('ewaste_bookings_change'));
  return updatedEntry;
}

export function cancelBooking(bookingId: string, reason?: string): boolean {
  const updated = updateBookingStatus(bookingId, 'Cancelled', reason || 'Cancelled by user request.');
  return !!updated;
}

// ----------------- TESTIMONIAL HELPERS -----------------

export function getReviews(): Testimonial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return raw ? JSON.parse(raw) : INITIAL_TESTIMONIALS;
  } catch (e) {
    console.error('Error parsing reviews from storage', e);
    return INITIAL_TESTIMONIALS;
  }
}

export function addReview(review: Omit<Testimonial, 'id' | 'date'>): Testimonial {
  const all = getReviews();
  const newId = `TEST${String(all.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString().split('T')[0];

  const newReview: Testimonial = {
    ...review,
    id: newId,
    date: now
  };

  all.unshift(newReview);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(all));
  window.dispatchEvent(new Event('ewaste_reviews_change'));
  return newReview;
}

// ----------------- CONTACT HELPERS -----------------

export function getContacts(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error parsing contacts from storage', e);
    return [];
  }
}

export function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const all = getContacts();
  const newId = `MSG${String(all.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString().split('T')[0];

  const newMsg: ContactMessage = {
    ...msg,
    id: newId,
    createdAt: now,
    status: 'New'
  };

  all.unshift(newMsg);
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(all));
  window.dispatchEvent(new Event('ewaste_contacts_change'));
  return newMsg;
}

// Reset database helper for demo testing
export function resetDatabaseToDemo(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_TESTIMONIALS));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));

  const defaultUser: User = {
    id: 'USER001',
    name: 'Vasavi',
    email: 'vasavi@example.com',
    password: 'password',
    location: 'Guntur, Andhra Pradesh',
    phone: '+91 98765 43210',
    createdAt: '2026-08-31'
  };
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultUser]));

  window.dispatchEvent(new Event('ewaste_auth_change'));
  window.dispatchEvent(new Event('ewaste_bookings_change'));
  window.dispatchEvent(new Event('ewaste_reviews_change'));
  window.dispatchEvent(new Event('ewaste_contacts_change'));
}
