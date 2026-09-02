import React, { useState, useEffect } from 'react';
import { User, DeviceCondition, Booking } from './types';
import { getCurrentUser, initDemoStorage } from './utils/storage';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StorageInspectorModal } from './components/StorageInspectorModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ClassificationView } from './views/ClassificationView';
import { ServicesView } from './views/ServicesView';
import { BookingView } from './views/BookingView';
import { TrackingView } from './views/TrackingView';
import { DashboardView } from './views/DashboardView';
import { TestimonialsView } from './views/TestimonialsView';
import { ContactView } from './views/ContactView';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [storageModalOpen, setStorageModalOpen] = useState<boolean>(false);

  // Cross-view handover data
  const [selectedBookingIdForTracking, setSelectedBookingIdForTracking] = useState<string>('');
  const [prefilledBookingData, setPrefilledBookingData] = useState<{
    categoryId: string;
    categoryName: string;
    condition: DeviceCondition;
    quantity: number;
    estimatedReward: number;
  } | null>(null);

  // Initialize Local Storage demo records on first load
  useEffect(() => {
    initDemoStorage();
    setCurrentUser(getCurrentUser());

    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('ewaste_auth_change', handleAuthChange);
    return () => window.removeEventListener('ewaste_auth_change', handleAuthChange);
  }, []);

  // Scroll to top whenever active view switches
  const handleViewChange = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForBooking = (data: {
    categoryId: string;
    categoryName: string;
    condition: DeviceCondition;
    quantity: number;
    estimatedReward: number;
  }) => {
    setPrefilledBookingData(data);
    handleViewChange('booking');
  };

  const handleSelectBookingForTracking = (bookingId: string) => {
    setSelectedBookingIdForTracking(bookingId);
    handleViewChange('tracking');
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
        {/* Navigation Bar */}
        <Navbar
          activeView={activeView}
          setActiveView={handleViewChange}
          currentUser={currentUser}
          onOpenStorageInspector={() => setStorageModalOpen(true)}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1">
          {activeView === 'home' && (
            <HomeView
              setActiveView={handleViewChange}
              currentUser={currentUser}
              onSelectCategoryForClassification={(catId) => {
                setPrefilledBookingData(null);
                handleViewChange('classification');
              }}
            />
          )}

          {activeView === 'about' && (
            <AboutView setActiveView={handleViewChange} />
          )}

          {activeView === 'classification' && (
            <ClassificationView
              setActiveView={handleViewChange}
              currentUser={currentUser}
              initialCategoryId="mobile-phone"
              onSelectForBooking={handleSelectForBooking}
            />
          )}

          {activeView === 'services' && (
            <ServicesView
              setActiveView={handleViewChange}
              currentUser={currentUser}
            />
          )}

          {activeView === 'booking' && (
            <BookingView
              setActiveView={handleViewChange}
              currentUser={currentUser}
              initialBookingData={prefilledBookingData}
              onBookingComplete={(b: Booking) => {
                setSelectedBookingIdForTracking(b.id);
              }}
            />
          )}

          {activeView === 'tracking' && (
            <TrackingView
              setActiveView={handleViewChange}
              currentUser={currentUser}
              initialBookingId={selectedBookingIdForTracking}
            />
          )}

          {activeView === 'dashboard' && (
            <DashboardView
              setActiveView={handleViewChange}
              currentUser={currentUser}
              onSelectBookingForTracking={handleSelectBookingForTracking}
            />
          )}

          {activeView === 'testimonials' && (
            <TestimonialsView
              currentUser={currentUser}
              setActiveView={handleViewChange}
            />
          )}

          {activeView === 'contact' && (
            <ContactView />
          )}

          {activeView === 'auth-login' && (
            <LoginView
              setActiveView={handleViewChange}
              onLoginSuccess={() => handleViewChange('dashboard')}
            />
          )}

          {activeView === 'auth-signup' && (
            <SignupView
              setActiveView={handleViewChange}
              onSignupSuccess={() => handleViewChange('dashboard')}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer setActiveView={handleViewChange} />

        {/* Local Storage Inspector Modal (MCA Project Debug / Inspection Tool) */}
        {storageModalOpen && (
          <StorageInspectorModal onClose={() => setStorageModalOpen(false)} />
        )}
      </div>
    </ToastProvider>
  );
}
