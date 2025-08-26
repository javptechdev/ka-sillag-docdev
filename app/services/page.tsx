'use client'

import { useState } from 'react'
import { Search, Filter, Building2 } from 'lucide-react'
import { Header } from '@/components/home/Header'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'
import { User } from '@/types'

// Extended Service interface for Services Module
interface Service {
  id: string
  name: string
  logo: string
  status: 'active' | 'denied' | 'soon'
  description: string
  division: string
  department: string
}

export default function ServicesPage() {
  // Mock user data (in real app, this comes from authentication)
  const [currentUser] = useState<User>({
    id: '1',
    employeeId: '2024001',
    name: 'Dr. Maria Santos Cruz',
    department: 'Internal Medicine',
    position: 'Senior Physician',
    email: 'maria.cruz@itrmc.gov.ph',
    phone: '+63 912 345 6789',
    avatar: undefined,
    isActive: true,
    lastLogin: new Date('2024-01-15T08:30:00Z')
  })

  // Extended microservices data with division and department info
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'IntelliFlow',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'Intelligent Patient Flow and Queue Management System',
      division: 'Medical Division',
      department: 'DHIU'
    },
    {
      id: '2',
      name: 'aISO',
      logo: '/icons/placeholder.svg',
      status: 'denied',
      description: 'AI Powered Document Management System (DMS) with Chatbot (RAG)',
      division: 'Medical Division',
      department: 'DHIU'
    },
    {
      id: '3',
      name: 'AiBTC',
      logo: '/icons/placeholder.svg',
      status: 'soon',
      description: 'Intelligent Animal Bite Appointment System (RAG)',
      division: 'Medical Division',
      department: 'DHIU'
    },
    {
      id: '4',
      name: 'IntelliFerral',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'Intelligent Clinic Referral System (RAG)',
      division: 'Medical Division',
      department: 'DHIU'
    },
    {
      id: '5',
      name: 'IntelliPath',
      logo: '/icons/placeholder.svg',
      status: 'denied',
      description: 'Intelligent Clinical Pathway Recommender System (RAG)',
      division: 'Medical Division',
      department: 'DHIU'
    },
    {
      id: '6',
      name: 'IntelliMent',
      logo: '/icons/placeholder.svg',
      status: 'soon',
      description: 'Realtime Intelligent Client Satisfaction Monitoring System (Sentiment Analysis LLM)',
      division: 'Medical Division',
      department: 'DHIU'
    },
    {
      id: '7',
      name: 'SmartPharmacy',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'AI-powered Pharmacy Management and Drug Interaction System',
      division: 'Pharmacy Division',
      department: 'Pharmacy Department'
    },
    {
      id: '8',
      name: 'LabAI',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'Intelligent Laboratory Results Analysis and Reporting System',
      division: 'Laboratory Division',
      department: 'Clinical Laboratory'
    },
    {
      id: '9',
      name: 'RadiologyAI',
      logo: '/icons/placeholder.svg',
      status: 'soon',
      description: 'AI-powered Radiology Image Analysis and Diagnosis Support',
      division: 'Radiology Division',
      department: 'Radiology Department'
    },
    {
      id: '10',
      name: 'EmergencyAI',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'Intelligent Emergency Response and Triage System',
      division: 'Emergency Division',
      department: 'Emergency Department'
    }
  ])

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'denied' | 'soon'>('all')
  const [divisionFilter, setDivisionFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique divisions for filter
  const divisions = ['all', ...Array.from(new Set(services.map(s => s.division)))]

  // Filter services based on search and filters
  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || service.status === statusFilter
      const matchesDivision = divisionFilter === 'all' || service.division === divisionFilter
      
      return matchesSearch && matchesStatus && matchesDivision
    })
    .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical ascending

  const handleServiceClick = (service: Service) => {
    if (service.status === 'active') {
      // In real app, redirect to service
      alert(`Redirecting to ${service.name}...`)
    } else if (service.status === 'denied') {
      alert('Access Denied: You do not have permission to access this service.')
    } else {
      alert('Coming Soon: This service will be available soon!')
    }
  }

  const handleNotificationClick = () => {
    alert('Opening notifications...')
  }

  const handleProfileClick = () => {
    alert('Opening profile...')
  }

  const handleNavigationClick = (moduleName: string) => {
    if (moduleName === 'home') {
      window.location.href = '/home'
    } else if (moduleName === 'qr') {
      window.location.href = '/qr'
    } else if (moduleName === 'latest') {
      alert('Navigating to Latest module...')
    } else if (moduleName === 'others') {
      alert('Navigating to Others module...')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
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
        return 'Coming Soon'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component - Same as Home Module */}
      <Header 
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        notificationCount={3}
        userName={currentUser.name}
        userAvatar={currentUser.avatar}
      />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Search and Filter Section */}
        <div className="space-y-4">
          {/* Search Bar and Filter Button */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search microservices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="denied">Denied</option>
                    <option value="soon">Coming Soon</option>
                  </select>
                </div>

                {/* Division Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                  <select
                    value={divisionFilter}
                    onChange={(e) => setDivisionFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {divisions.map(division => (
                      <option key={division} value={division}>
                        {division === 'all' ? 'All Divisions' : division}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Available Microservices</h2>
            <span className="text-sm text-gray-500">{filteredServices.length} services found</span>
          </div>

          <div className="space-y-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* Service Logo */}
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={service.logo}
                      alt={`${service.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {service.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Building2 className="w-4 h-4" />
                      <span>{service.department} from {service.division}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No services found matching your criteria.</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Horizontal Navigation Bar - Services highlighted */}
      <HorizontalNavigationBar 
        currentModule="services"
        onNavigationClick={handleNavigationClick}
      />
    </div>
  )
}
