'use client'

import { ArrowLeft, Info } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface UnitService {
  id: string
  name: string
  logo: string
  status: 'active' | 'denied' | 'soon'
  description?: string
}

interface Department {
  id: string
  name: string
  logo: string
  description?: string
  unitServices: UnitService[]
}

interface Division {
  id: string
  name: string
  logo: string
  description?: string
  departments: Department[]
}

interface DivisionModalProps {
  isOpen: boolean
  division: Division | null
  onClose: () => void
}

export function DivisionModal({ isOpen, division, onClose }: DivisionModalProps) {
  if (!division) return null

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
        return 'No Access'
      case 'soon':
        return 'Soon'
      default:
        return 'Unknown'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          {/* Back Arrow */}
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Division Name */}
          <h2 className="text-xl font-semibold text-gray-900 text-center flex-1">
            {division.name}
          </h2>

          {/* Info Icon */}
          <button
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            aria-label="Division information"
            onClick={() => alert(`Division Info: ${division.description || 'No description available'}`)}
          >
            <Info size={20} />
          </button>
        </div>

        {/* Departments List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Departments
          </h3>
          
          {division.departments.map((department) => (
            <div key={department.id} className="bg-gray-50 rounded-lg p-4">
              {/* Department Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src={department.logo}
                    alt={`${department.name} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  <div className="w-8 h-8 text-gray-400 hidden">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{department.name}</h4>
                  {department.description && (
                    <p className="text-sm text-gray-500">{department.description}</p>
                  )}
                </div>
              </div>

              {/* Unit Services */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Unit Services:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {department.unitServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <img
                            src={service.logo}
                            alt={`${service.name} logo`}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                          <div className="w-5 h-5 text-gray-400 hidden">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {service.name}
                          </p>
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(service.status)}`}>
                          {getStatusText(service.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
