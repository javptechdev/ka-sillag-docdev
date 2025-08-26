'use client';

import React, { useState } from 'react';
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
  const [formSetters, setFormSetters] = useState<{
    setEmployeeId: (value: string) => void;
    setPinCode: (value: string) => void;
  } | null>(null);

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

      {/* Main Content - Login Form */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-0">
        <div className="w-full max-w-md space-y-6">
          {/* Greetings */}
          <Greetings />
          


          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={loginError}
            setFormData={setFormSetters}
          />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => setIsForgotModalOpen(true)}
              variant="outline"
              className="w-full"
            >
              <HelpCircle size={16} className="mr-2" />
              Forgot Credentials?
            </Button>

            <Button
              onClick={() => setIsRequestModalOpen(true)}
              variant="outline"
              className="w-full"
            >
              <UserPlus size={16} className="mr-2" />
              Request New Account
            </Button>

            <Button
              onClick={() => window.location.href = '/home'}
              variant="outline"
              className="w-full"
            >
              <Download size={16} className="mr-2" />
              Install App
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 ITRMC Ka-Sillag Connect. All rights reserved.</p>
        <p className="mt-1">Ilocos Training and Regional Medical Center</p>
        <p className="mt-1">Innovated by DHIU. Driven by Compassion.</p>
        
                 {/* Auto-fill Link for Testing */}
         <div className="mt-4 pt-4 border-t border-gray-200">
           <button
             onClick={() => {
               if (formSetters) {
                 // Use the React state setters to properly update the form
                 formSetters.setEmployeeId('2024001');
                 formSetters.setPinCode('123456');
               }
             }}
             className="text-xs text-primary hover:text-primary/80 underline"
           >
             Auto-fill for Testing (Employee ID: 2024001 | Pin: 123456)
           </button>
         </div>
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
