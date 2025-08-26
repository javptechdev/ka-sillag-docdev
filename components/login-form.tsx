import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (credentials: { employeeId: string; pinCode: string }) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim() && pinCode.trim()) {
      onSubmit({ employeeId: employeeId.trim(), pinCode: pinCode.trim() });
    }
  };

  // Function to only allow digits
  const handleDigitInput = (value: string, setter: (value: string) => void) => {
    const digitsOnly = value.replace(/\D/g, '');
    setter(digitsOnly);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="employeeId" className="text-sm font-medium text-gray-700">
          Employee ID
        </label>
        <Input
          id="employeeId"
          type="text"
          placeholder="Enter 10-digit Employee ID"
          value={employeeId}
          onChange={(e) => handleDigitInput(e.target.value, setEmployeeId)}
          maxLength={10}
          className="ka-sillag-input"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pinCode" className="text-sm font-medium text-gray-700">
          6-Digit Pin Code
        </label>
        <div className="relative">
          <Input
            id="pinCode"
            type={showPin ? 'text' : 'password'}
            placeholder="Enter 6-digit Pin Code"
            value={pinCode}
            onChange={(e) => handleDigitInput(e.target.value, setPinCode)}
            maxLength={6}
            className="ka-sillag-input pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="ka-sillag-button w-full"
        disabled={isLoading || !employeeId.trim() || !pinCode.trim()}
      >
        {isLoading ? 'Mag-login...' : 'Mag-login'}
      </Button>
    </form>
  );
};
