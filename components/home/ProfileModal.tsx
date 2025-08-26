'use client'

import { X, LogOut, User, Mail, Shield } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  role: string
  permissions: string[]
}

interface ProfileModalProps {
  isOpen: boolean
  user: User
  onClose: () => void
}

export function ProfileModal({ isOpen, user, onClose }: ProfileModalProps) {
  const handleLogout = () => {
    // In real app, handle logout logic
    alert('Logging out...')
    onClose()
  }

  const handleViewProfile = () => {
    // In real app, navigate to full profile page
    alert('Viewing full profile...')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 mx-auto mb-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {user.firstName} {user.lastName}
          </h3>

          {/* Role */}
          <p className="text-gray-600 mb-2">
            {user.role}
          </p>

          {/* Email */}
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Mail size={16} />
            <span className="text-sm">{user.email}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* View Profile Button */}
          <button
            onClick={handleViewProfile}
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <User size={20} />
            <span>View Full Profile</span>
          </button>

          {/* Permissions Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Shield size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Access Permissions</span>
            </div>
            <div className="text-xs text-blue-700">
              {user.permissions.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {user.permissions.map((permission, index) => (
                    <li key={index} className="capitalize">
                      {permission.replace(/_/g, ' ')}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No specific permissions assigned</p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-100 text-red-700 px-4 py-3 rounded-lg hover:bg-red-200 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
