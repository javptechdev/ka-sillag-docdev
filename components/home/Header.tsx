'use client'

import { Bell, User } from 'lucide-react'

interface HeaderProps {
  onNotificationClick: () => void
  onProfileClick: () => void
  notificationCount?: number
  userName?: string
  userAvatar?: string
}

export function Header({ 
  onNotificationClick, 
  onProfileClick, 
  notificationCount = 0,
  userName = "User",
  userAvatar
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left Side - App Name */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">
            Ka-Sillag Connect
          </h1>
        </div>

        {/* Right Side - User Controls */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <Bell size={24} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          {/* Profile Icon */}
          <button
            onClick={onProfileClick}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary transition-colors"
            aria-label="Profile"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${userName}'s avatar`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  // Hide broken image and show fallback
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : null}
            <div className={`w-8 h-8 bg-primary rounded-full flex items-center justify-center ${userAvatar ? 'hidden' : ''}`}>
              <User size={20} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
