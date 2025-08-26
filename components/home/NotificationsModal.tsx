'use client'

import { X, Bell, Clock, User } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: Date
  isRead: boolean
  sender?: string
}

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  // Mock notifications data
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Hospital Policy Update',
      message: 'Important changes to patient care procedures have been implemented. Please review the updated protocols.',
      type: 'info',
      timestamp: new Date('2024-01-15T09:00:00'),
      isRead: false,
      sender: 'Admin'
    },
    {
      id: '2',
      title: 'Staff Training Reminder',
      message: 'Mandatory training session tomorrow at 2:00 PM. Attendance is required for all nursing staff.',
      type: 'warning',
      timestamp: new Date('2024-01-15T08:30:00'),
      isRead: false,
      sender: 'HR Department'
    },
    {
      id: '3',
      title: 'Equipment Maintenance Complete',
      message: 'Radiology equipment maintenance has been completed. All services are now available.',
      type: 'success',
      timestamp: new Date('2024-01-14T16:00:00'),
      isRead: true,
      sender: 'Maintenance Team'
    },
    {
      id: '4',
      title: 'System Update Scheduled',
      message: 'System maintenance scheduled for tonight at 11:00 PM. Some services may be temporarily unavailable.',
      type: 'info',
      timestamp: new Date('2024-01-14T14:00:00'),
      isRead: true,
      sender: 'IT Department'
    }
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-blue-600 bg-blue-100'
    }
  }

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200'
      case 'warning':
        return 'border-yellow-200'
      case 'error':
        return 'border-red-200'
      default:
        return 'border-blue-200'
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <Bell size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${getNotificationBorder(notification.type)} ${
                  notification.isRead ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {/* Notification Header */}
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationIcon(notification.type)}`}>
                    <Bell size={16} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                      {notification.message}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                      {notification.sender && (
                        <div className="flex items-center space-x-1">
                          <User size={12} />
                          <span>{notification.sender}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell size={48} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {unreadCount} unread
              </span>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                Mark all as read
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
