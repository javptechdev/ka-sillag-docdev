'use client'

import { useState } from 'react'
import { Header } from '@/components/home/Header'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'
import { User as UserType } from '@/types'
import { Search, Filter, Building2, BarChart3, TrendingUp, PieChart, Activity, Target, Zap, Heart, Shield, Cpu, ArrowRight } from 'lucide-react'

// Analytics Microservice interface
interface AnalyticsMicroservice {
  id: string
  name: string
  description: string
  division: string
  department: string
  logo: string
  availableDashboards: number
  lastUpdated: Date
}

export default function AnalyticsPage() {
  // Mock user data
  const [currentUser] = useState<UserType>({
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

  // Mock analytics microservices data (adapted from Services module) - Alphabetically Sorted
  const [analyticsServices] = useState<AnalyticsMicroservice[]>([
    {
      id: '1',
      name: 'AiBTC',
      description: 'Intelligent Animal Bite Appointment System (RAG)',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 6,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      id: '2',
      name: 'aISO',
      description: 'AI Powered Document Management System (DMS) with Chatbot (RAG)',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 8,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      id: '3',
      name: 'EmergencyAI',
      description: 'Intelligent Emergency Response and Triage System',
      division: 'Emergency Division',
      department: 'Emergency Department',
      logo: '/icons/placeholder.svg',
      availableDashboards: 7,
      lastUpdated: new Date('2024-01-14T10:00:00Z')
    },
    {
      id: '4',
      name: 'IntelliFerral',
      description: 'Intelligent Clinic Referral System (RAG)',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 7,
      lastUpdated: new Date('2024-01-14T16:20:00Z')
    },
    {
      id: '5',
      name: 'IntelliFlow',
      description: 'Intelligent Patient Flow and Queue Management System',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 5,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      id: '6',
      name: 'IntelliMent',
      description: 'Realtime Intelligent Client Satisfaction Monitoring System (Sentiment Analysis LLM)',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 3,
      lastUpdated: new Date('2024-01-14T14:00:00Z')
    },
    {
      id: '7',
      name: 'IntelliPath',
      description: 'Intelligent Clinical Pathway Recommender System (RAG)',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 4,
      lastUpdated: new Date('2024-01-14T15:10:00Z')
    },
    {
      id: '8',
      name: 'LabAI',
      description: 'Intelligent Laboratory Results Analysis and Reporting System',
      division: 'Laboratory Division',
      department: 'Clinical Laboratory',
      logo: '/icons/placeholder.svg',
      availableDashboards: 6,
      lastUpdated: new Date('2024-01-14T12:15:00Z')
    },
    {
      id: '9',
      name: 'RadiologyAI',
      description: 'AI-powered Radiology Image Analysis and Diagnosis Support',
      division: 'Radiology Division',
      department: 'Radiology Department',
      logo: '/icons/placeholder.svg',
      availableDashboards: 4,
      lastUpdated: new Date('2024-01-14T11:00:00Z')
    },
    {
      id: '10',
      name: 'SmartPharmacy',
      description: 'AI-powered Pharmacy Management and Drug Interaction System',
      division: 'Pharmacy Division',
      department: 'Pharmacy Department',
      logo: '/icons/placeholder.svg',
      availableDashboards: 5,
      lastUpdated: new Date('2024-01-14T13:30:00Z')
    }
  ])

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [divisionFilter, setDivisionFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter analytics services
  const filteredServices = analyticsServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDivision = divisionFilter === 'all' || service.division === divisionFilter
    
    return matchesSearch && matchesDivision
  })

  // Get unique divisions for filter
  const divisions = ['all', ...Array.from(new Set(analyticsServices.map(service => service.division)))]

  // Handle service click
  const handleServiceClick = (service: AnalyticsMicroservice) => {
    alert(`Opening ${service.name} Analytics Dashboard...\n\nAvailable Dashboards: ${service.availableDashboards}\nLast Updated: ${service.lastUpdated.toLocaleString()}`)
  }



  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('')
    setDivisionFilter('all')
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || divisionFilter !== 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header currentUser={currentUser} />

      {/* Main Content */}
      <main className="pb-24">
        {/* Page Title */}
        <div className="bg-white border-b border-gray-200 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Analytics Module</h1>
            <p className="text-gray-600 mt-2">
              Access comprehensive analytics and dashboards from our intelligent microservices
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search analytics microservices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  showFilters 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                )}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Clear Filters Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

                 {/* Analytics Services List */}
         <div className="max-w-7xl mx-auto px-4 py-6">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-semibold text-gray-900">Available Services with Analytics</h2>
             <span className="text-sm text-gray-500">{filteredServices.length} services found</span>
           </div>
           <div className="space-y-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* Service Image Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-dashed border-gray-300 relative overflow-hidden">
                    {/* Placeholder Icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-gray-400" />
                    </div>
                    {/* Service Image (when available) */}
                    {/* <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover rounded-lg" /> */}
                  </div>

                                     {/* Service Details */}
                   <div className="flex-1 min-w-0">
                     {/* Title and Dashboard Count Row */}
                     <div className="flex items-start justify-between mb-3">
                       <h4 className="text-lg font-semibold text-gray-900 flex-1 mr-3">
                         {service.name}
                       </h4>
                       <span className="inline-block px-2 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                         {service.availableDashboards} Dashboards
                       </span>
                     </div>
                     
                     {/* Description */}
                     <div className="mb-3">
                       <p className="text-sm text-gray-600">{service.description}</p>
                     </div>
                     
                     {/* Department from Division */}
                     <div className="text-sm text-gray-500">
                       <span>{service.department} from <span className="font-medium text-gray-700">{service.division}</span></span>
                     </div>
                   </div>

                                     {/* Arrow */}
                   <div className="flex-shrink-0">
                     <ArrowRight size={20} className="text-gray-400" />
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No analytics services found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Navigation Bar */}
      <HorizontalNavigationBar currentModule="analytics" />
    </div>
  )
}
