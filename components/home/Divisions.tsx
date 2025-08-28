'use client'

interface Department {
  id: string
  name: string
  logo: string
  description?: string
  unitServices: any[]
}

interface Division {
  id: string
  name: string
  logo: string
  description?: string
  departments: Department[]
}

interface DivisionsProps {
  divisions: Division[]
  onDivisionClick: (divisionId: string) => void
}

export function Divisions({ divisions, onDivisionClick }: DivisionsProps) {
  return (
    <section className="space-y-4">
      {/* Component Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          Hospital Services
        </h3>
      </div>

      {/* Division Cards Grid - 2 per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {divisions.map((division) => (
          <div
            key={division.id}
            onClick={() => onDivisionClick(division.id)}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4"
          >
            <div className="flex items-center space-x-4">
              {/* Division Logo */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={division.logo}
                  alt={`${division.name} logo`}
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

              {/* Division Name */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm leading-tight">
                  {division.name}
                </h4>
                {division.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {division.description}
                  </p>
                )}
              </div>

              {/* Arrow indicator */}
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
