'use client'

import { ArrowRight } from 'lucide-react'

interface Service {
  id: string
  name: string
  logo: string
  status: 'active' | 'denied' | 'soon'
  description?: string
}

interface FeatureServicesProps {
  services: Service[]
  onServiceClick: (serviceId: string) => void
  onSeeAllClick: () => void
}

export function FeatureServices({ services, onServiceClick, onSeeAllClick }: FeatureServicesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'soon':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'denied':
        return 'Denied'
      case 'soon':
        return 'Soon'
      default:
        return 'Unknown'
    }
  }

  return (
    <section className="space-y-4">
      {/* Component Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          Feature Services
        </h3>
        <button
          onClick={onSeeAllClick}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
        >
          <span>See All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => onServiceClick(service.id)}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 text-center"
          >
            {/* Service Logo */}
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={service.logo}
                alt={`${service.name} logo`}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback icon if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <div className="w-10 h-10 text-gray-400 hidden">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

                         {/* Service Name */}
             <h4 className="font-medium text-gray-900 mb-2">
               {service.name}
             </h4>

             {/* Service Description */}
             {service.description && (
               <p className="text-xs text-gray-600 mb-2 leading-tight line-clamp-2">
                 {service.description}
               </p>
             )}

             {/* Status Badge */}
             <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(service.status)}`}>
               {getStatusText(service.status)}
             </span>
          </div>
        ))}
      </div>
    </section>
  )
}
