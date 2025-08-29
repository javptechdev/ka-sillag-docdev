'use client'

import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
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

  const handleDepartmentClick = (department: Department) => {
    // For now, just show an alert with department info
    // Later this can open a sub-modal or navigate to department details
    alert(`Department: ${department.name}\n\nUnit Services:\n${department.unitServices.map(service => `• ${service.name} (${service.status})`).join('\n')}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-full h-full max-h-none p-0">
        {/* Header */}
        <div className="relative bg-white border-b border-gray-200 p-6">
          {/* Header Content with proper spacing */}
          <div className="flex items-center justify-between">
            {/* Back Arrow */}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>

            {/* Division Name - Centered */}
            <h2 className="text-2xl font-semibold text-gray-900 text-center flex-1 mx-4">
              {division.name}
            </h2>

            {/* Info Icon */}
            <button
              className="p-2 text-gray-600 hover:text-primary transition-colors"
              aria-label="Division information"
              onClick={() => {
                // Store division name and redirect to Division Info Module
                localStorage.setItem('selectedDivision', division.name)
                const params = new URLSearchParams({ division: division.name })
                window.location.href = `/division-info?${params.toString()}`
              }}
            >
              <Info size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 p-6" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
          {/* Departments List */}
          <div className="space-y-3">
            {division.departments
              .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical ascending
              .map((department) => (
                <div 
                  key={department.id} 
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleDepartmentClick(department)}
                >
                  {/* Department Line */}
                  <div className="flex items-center space-x-4">
                    {/* Logo Placeholder */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-gray-400">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>

                    {/* Department Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-lg">{department.name}</h4>
                      {department.description && (
                        <p className="text-sm text-gray-500 mt-1">{department.description}</p>
                      )}
                    </div>

                    {/* Right Arrow */}
                    <div className="flex-shrink-0">
                      <ArrowRight size={20} className="text-primary" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
