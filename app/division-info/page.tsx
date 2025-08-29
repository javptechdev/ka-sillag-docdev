'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Info, Target, Eye, Users, BarChart3, FileText } from 'lucide-react'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'

// Division Info Link interface
interface DivisionInfoLink {
  id: string
  title: string
  icon: any
  description: string
  hasContent: boolean
}

export default function DivisionInfoPage() {
  // Get division name from URL params (in real app, use proper routing)
  const [divisionName, setDivisionName] = useState<string>('')
  
  // Division info links
  const [infoLinks] = useState<DivisionInfoLink[]>([
    {
      id: 'about',
      title: 'About',
      icon: Info,
      description: 'Learn about this division\'s purpose and background',
      hasContent: true
    },
    {
      id: 'vision',
      title: 'Vision',
      icon: Eye,
      description: 'Our division\'s future aspirations and goals',
      hasContent: true
    },
    {
      id: 'mission',
      title: 'Mission',
      icon: Target,
      description: 'Our division\'s core purpose and commitment',
      hasContent: true
    },
    {
      id: 'strategic-objectives',
      title: 'Strategic Objectives',
      icon: BarChart3,
      description: 'Key performance indicators and strategic goals',
      hasContent: true
    },
    {
      id: 'organizational-chart',
      title: 'Organizational Chart',
      icon: Users,
      description: 'Division structure and reporting hierarchy',
      hasContent: true
    },
    {
      id: 'policies',
      title: 'Policies & Procedures',
      icon: FileText,
      description: 'Division guidelines and operational procedures',
      hasContent: false
    }
  ])

  // Get division name from URL or localStorage (from previous page)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const division = urlParams.get('division') || localStorage.getItem('selectedDivision') || 'Medical Division'
    setDivisionName(division)
  }, [])

  const handleBackClick = () => {
    window.history.back()
  }

  const handleInfoLinkClick = (link: DivisionInfoLink) => {
    if (link.hasContent) {
      // Navigate to info content page
      const params = new URLSearchParams({
        division: divisionName,
        infoType: link.id,
        infoTitle: link.title
      })
      window.location.href = `/info-content?${params.toString()}`
    } else {
      alert(`${link.title} content is coming soon!`)
    }
  }

  const handleNavigationClick = (moduleName: string) => {
    if (moduleName === 'home') {
      window.location.href = '/home'
    } else if (moduleName === 'services') {
      window.location.href = '/services'
    } else if (moduleName === 'qr') {
      window.location.href = '/qr'
    } else if (moduleName === 'analytics') {
      alert('Navigating to Analytics module...')
    } else if (moduleName === 'others') {
      alert('Navigating to Others module...')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header for Division Info */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 flex-1">
            {divisionName}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Page Description */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Division Information</h2>
          <p className="text-gray-600">
            Explore detailed information about the {divisionName}
          </p>
        </div>

        {/* Info Links Grid */}
        <div className="space-y-4">
          {infoLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <div
                key={link.id}
                onClick={() => handleInfoLinkClick(link)}
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
                  !link.hasContent ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent size={24} className="text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {link.title}
                      </h3>
                      {!link.hasContent && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {link.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <ArrowLeft size={20} className="text-gray-400 rotate-180" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Horizontal Navigation Bar */}
      <HorizontalNavigationBar 
        currentModule="home"
        onNavigationClick={handleNavigationClick}
      />
    </div>
  )
}
