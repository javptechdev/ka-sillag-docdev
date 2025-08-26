'use client'

import { Home, Settings, QrCode, Clock, MoreHorizontal } from 'lucide-react'

interface HorizontalNavigationBarProps {
  currentModule: 'home' | 'services' | 'qr' | 'latest' | 'others'
  onNavigationClick: (moduleName: string) => void
  className?: string
}

export function HorizontalNavigationBar({ currentModule, onNavigationClick, className = '' }: HorizontalNavigationBarProps) {
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isHighlighted: currentModule === 'home'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Settings,
      isHighlighted: currentModule === 'services'
    },
    {
      id: 'qr',
      label: 'My QR',
      icon: QrCode,
      isHighlighted: currentModule === 'qr',
      isElevated: true
    },
    {
      id: 'latest',
      label: 'Latest',
      icon: Clock,
      isHighlighted: currentModule === 'latest'
    },
    {
      id: 'others',
      label: 'Others',
      icon: MoreHorizontal,
      isHighlighted: currentModule === 'others'
    }
  ]

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg ${className}`}>
      <div className="h-16 px-4 flex items-center justify-around">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          const isActive = item.isHighlighted
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigationClick(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                item.isElevated 
                  ? 'relative -top-2 transform scale-110' 
                  : ''
              }`}
            >
              {/* Icon Container */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
                ${item.isElevated ? 'shadow-xl' : ''}
              `}>
                <IconComponent size={24} />
              </div>
              
              {/* Label */}
              <span className={`
                text-xs font-medium transition-colors duration-200
                ${isActive ? 'text-primary' : 'text-gray-600'}
              `}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
