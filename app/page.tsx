'use client';

import React, { useState, useEffect } from 'react';
import { KaSillagLogo } from '@/components/ka-sillag-logo';
import { Greetings } from '@/components/greetings';
import { LoginForm } from '@/components/login-form';
import { ForgotCredentialsModal } from '@/components/forgot-credentials-modal';
import { RequestAccountModal } from '@/components/request-account-modal';
import { Button } from '@/components/ui/button';
import { HelpCircle, Download, UserPlus } from 'lucide-react';
import { dummyUsers } from '@/data/dummy-data';

export default function LoginPage() {
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // For demo purposes, redirect to home module after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // In real app, check authentication status here
      // For now, redirect to home module to showcase our work
      window.location.href = '/home';
    }, 2000); // 2 second delay to show loading state

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (credentials: { employeeId: string; pinCode: string }) => {
    setIsLoading(true);
    setLoginError('');
    setTimeout(() => {
      const user = dummyUsers.find(u => u.employeeId === credentials.employeeId);
      if (user && credentials.pinCode === '123456') {
        console.log('Login successful:', user);
        alert(`Welcome back, ${user.name}! Redirecting to Home Module...`);
        // Redirect to home module
        window.location.href = '/home';
      } else {
        setLoginError('Employee ID and Pin Code is incorrect');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Extra Large Logo with Minimal Spacing */}
      <header className="flex justify-center items-center pt-6 pb-0">
        <KaSillagLogo size="xl" />
      </header>

      {/* Main Content - Loading State */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-0">
        <div className="text-center space-y-6">
          {/* Loading Spinner */}
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          
          {/* Loading Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              Loading Ka-Sillag Connect...
            </h2>
            <p className="text-gray-600">
              Redirecting to Home Module in a few seconds...
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 ITRMC Ka-Sillag Connect. All rights reserved.</p>
        <p className="mt-1">Ilocos Training and Regional Medical Center</p>
        <p className="mt-1">Innovated by DHIU. Driven by Compassion.</p>
      </footer>
      {/* Modals */}
      <ForgotCredentialsModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
      <RequestAccountModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
}
