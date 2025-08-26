import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface RequestAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccountModal: React.FC<RequestAccountModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setMessage('Account request submitted successfully! You will receive an email confirmation.');
      setIsSubmitting(false);
      // Reset form after success
      setTimeout(() => {
        onClose();
        setFormData({
          fullName: '',
          employeeId: '',
          department: '',
          position: '',
          email: '',
          phone: '',
          reason: ''
        });
        setMessage('');
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <CardTitle className="text-xl text-primary">Request New Account</CardTitle>
          <CardDescription>
            Fill out the form below to request access to Ka-Sillag Connect
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="employeeId" className="text-sm font-medium text-gray-700">
                  Employee ID *
                </label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  placeholder="Enter your Employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium text-gray-700">
                  Department *
                </label>
                <Input
                  id="department"
                  name="department"
                  placeholder="Enter your department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium text-gray-700">
                  Position *
                </label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Enter your position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium text-gray-700">
                Reason for Access *
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Please explain why you need access to Ka-Sillag Connect"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>

            {message && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">{message}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
