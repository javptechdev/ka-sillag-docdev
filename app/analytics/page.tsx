'use client'

import { useState } from 'react'
import { Header } from '@/components/home/Header'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'
import { User as UserType } from '@/types'
import { Search, Filter, Building2, BarChart3, TrendingUp, PieChart, Activity, Target, Zap, Heart, Shield, Cpu, ArrowRight, ArrowLeft, BarChart } from 'lucide-react'

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

// Dashboard interface
interface Dashboard {
  id: string
  name: string
  description: string
  type: 'patient-flow' | 'queue' | 'capacity' | 'analytics' | 'monitoring'
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

  // Mock dashboard data for each microservice
  const [dashboards] = useState<Record<string, Dashboard[]>>({
    '1': [ // AiBTC
      { id: '1-1', name: 'Animal Bite Statistics Dashboard', description: 'Comprehensive view of animal bite cases and trends', type: 'analytics' },
      { id: '1-2', name: 'Appointment Scheduling Analytics', description: 'Real-time appointment booking and scheduling insights', type: 'capacity' },
      { id: '1-3', name: 'Patient Wait Time Monitor', description: 'Track patient wait times and queue performance', type: 'monitoring' },
      { id: '1-4', name: 'Treatment Outcome Tracker', description: 'Monitor treatment success rates and patient outcomes', type: 'analytics' },
      { id: '1-5', name: 'Resource Utilization Dashboard', description: 'Track staff and equipment utilization efficiency', type: 'capacity' },
      { id: '1-6', name: 'Geographic Distribution Map', description: 'Visualize animal bite cases by location', type: 'analytics' }
    ],
    '2': [ // aISO
      { id: '2-1', name: 'Document Processing Analytics', description: 'Track document processing times and efficiency', type: 'analytics' },
      { id: '2-2', name: 'Chatbot Performance Monitor', description: 'Monitor chatbot response accuracy and user satisfaction', type: 'monitoring' },
      { id: '2-3', name: 'Storage Usage Dashboard', description: 'Track document storage and retrieval performance', type: 'capacity' },
      { id: '2-4', name: 'User Activity Tracker', description: 'Monitor user engagement and document access patterns', type: 'analytics' },
      { id: '2-5', name: 'Search Performance Analytics', description: 'Track search accuracy and response times', type: 'analytics' },
      { id: '2-6', name: 'System Health Monitor', description: 'Real-time system performance and uptime tracking', type: 'monitoring' },
      { id: '2-7', name: 'Compliance Dashboard', description: 'Monitor document compliance and audit trails', type: 'analytics' },
      { id: '2-8', name: 'Integration Status Tracker', description: 'Track system integration and data flow status', type: 'monitoring' }
    ],
    '3': [ // EmergencyAI
      { id: '3-1', name: 'Emergency Response Dashboard', description: 'Real-time emergency response and triage status', type: 'monitoring' },
      { id: '3-2', name: 'Patient Triage Analytics', description: 'Track triage accuracy and response times', type: 'analytics' },
      { id: '3-3', name: 'Resource Allocation Monitor', description: 'Monitor emergency department resource utilization', type: 'capacity' },
      { id: '3-4', name: 'Response Time Tracker', description: 'Track emergency response times by priority level', type: 'monitoring' },
      { id: '3-5', name: 'Patient Flow Analytics', description: 'Analyze patient movement through emergency services', type: 'analytics' },
      { id: '3-6', name: 'Staff Performance Monitor', description: 'Track staff efficiency and response quality', type: 'monitoring' },
      { id: '3-7', name: 'Capacity Planning Dashboard', description: 'Forecast emergency department capacity needs', type: 'capacity' }
    ],
    '4': [ // IntelliFerral
      { id: '4-1', name: 'Referral Analytics Dashboard', description: 'Track referral patterns and success rates', type: 'analytics' },
      { id: '4-2', name: 'Clinic Capacity Monitor', description: 'Monitor available clinic slots and scheduling', type: 'capacity' },
      { id: '4-3', name: 'Patient Wait Time Tracker', description: 'Track patient wait times for referrals', type: 'monitoring' },
      { id: '4-4', name: 'Specialist Availability Dashboard', description: 'Monitor specialist availability and scheduling', type: 'capacity' },
      { id: '4-5', name: 'Referral Outcome Tracker', description: 'Track referral completion and patient outcomes', type: 'analytics' },
      { id: '4-6', name: 'Geographic Distribution Map', description: 'Visualize referral patterns by location', type: 'analytics' },
      { id: '4-7', name: 'Performance Metrics Monitor', description: 'Track referral system performance indicators', type: 'monitoring' }
    ],
    '5': [ // IntelliFlow - Focus on this one as requested
      { id: '5-1', name: 'Patient Flow Capacity Dashboard', description: 'Monitor patient flow and capacity utilization', type: 'capacity' },
      { id: '5-2', name: 'Queue Tracker', description: 'Real-time queue monitoring and management', type: 'monitoring' }
    ],
    '6': [ // IntelliMent
      { id: '6-1', name: 'Sentiment Analysis Dashboard', description: 'Real-time client satisfaction sentiment tracking', type: 'analytics' },
      { id: '6-2', name: 'Satisfaction Score Monitor', description: 'Track client satisfaction scores and trends', type: 'monitoring' },
      { id: '6-3', name: 'Feedback Analytics Dashboard', description: 'Analyze feedback patterns and improvement areas', type: 'analytics' }
    ],
    '7': [ // IntelliPath
      { id: '7-1', name: 'Clinical Pathway Analytics', description: 'Track pathway recommendations and outcomes', type: 'analytics' },
      { id: '7-2', name: 'Recommendation Engine Monitor', description: 'Monitor recommendation accuracy and performance', type: 'monitoring' },
      { id: '7-3', name: 'Outcome Tracker Dashboard', description: 'Track patient outcomes following pathway recommendations', type: 'analytics' },
      { id: '7-4', name: 'Performance Metrics Monitor', description: 'Track system performance and user engagement', type: 'monitoring' }
    ],
    '8': [ // LabAI
      { id: '8-1', name: 'Laboratory Results Dashboard', description: 'Track lab test results and turnaround times', type: 'analytics' },
      { id: '8-2', name: 'Quality Control Monitor', description: 'Monitor lab quality metrics and accuracy', type: 'monitoring' },
      { id: '8-3', name: 'Capacity Planning Dashboard', description: 'Forecast lab capacity and resource needs', type: 'capacity' },
      { id: '8-4', name: 'Performance Analytics', description: 'Analyze lab performance and efficiency metrics', type: 'analytics' },
      { id: '8-5', name: 'Equipment Utilization Tracker', description: 'Monitor lab equipment usage and maintenance', type: 'capacity' },
      { id: '8-6', name: 'Staff Performance Monitor', description: 'Track staff efficiency and productivity', type: 'monitoring' }
    ],
    '9': [ // RadiologyAI
      { id: '9-1', name: 'Image Analysis Dashboard', description: 'Track AI analysis accuracy and performance', type: 'analytics' },
      { id: '9-2', name: 'Diagnosis Support Monitor', description: 'Monitor diagnosis support system performance', type: 'monitoring' },
      { id: '9-3', name: 'Quality Assurance Dashboard', description: 'Track image quality and analysis reliability', type: 'analytics' },
      { id: '9-4', name: 'Performance Metrics Tracker', description: 'Monitor system performance and response times', type: 'monitoring' }
    ],
    '10': [ // SmartPharmacy
      { id: '10-1', name: 'Drug Interaction Dashboard', description: 'Monitor drug interaction alerts and safety', type: 'analytics' },
      { id: '10-2', name: 'Inventory Management Monitor', description: 'Track medication inventory and stock levels', type: 'capacity' },
      { id: '10-3', name: 'Prescription Analytics', description: 'Analyze prescription patterns and trends', type: 'analytics' },
      { id: '10-4', name: 'Safety Alert Monitor', description: 'Track medication safety alerts and incidents', type: 'monitoring' },
      { id: '10-5', name: 'Performance Metrics Dashboard', description: 'Monitor pharmacy system performance indicators', type: 'monitoring' }
    ]
  })

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [divisionFilter, setDivisionFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // State for dashboard modal
  const [selectedService, setSelectedService] = useState<AnalyticsMicroservice | null>(null)
  const [showDashboardModal, setShowDashboardModal] = useState(false)
  
  // State for dashboard detail modal
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null)
  const [showDashboardDetailModal, setShowDashboardDetailModal] = useState(false)

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

  // Handle service click - open dashboard modal
  const handleServiceClick = (service: AnalyticsMicroservice) => {
    setSelectedService(service)
    setShowDashboardModal(true)
  }

  // Handle dashboard click
  const handleDashboardClick = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard)
    setShowDashboardDetailModal(true)
  }

  // Close dashboard modal
  const closeDashboardModal = () => {
    setShowDashboardModal(false)
    setSelectedService(null)
  }
  
  // Close dashboard detail modal
  const closeDashboardDetailModal = () => {
    setShowDashboardDetailModal(false)
    setSelectedDashboard(null)
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
              className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 relative"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
              {/* Active filters indicator */}
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              )}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
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

        {/* Analytics Services List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
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
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {service.name}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                        {service.availableDashboards} Dashboards
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

      {/* Dashboard List Modal */}
      {showDashboardModal && selectedService && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="w-full h-full flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200 bg-gray-50">
              <button
                onClick={closeDashboardModal}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedService.name}</h2>
                <p className="text-sm text-gray-600">{selectedService.department} from {selectedService.division}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Available Dashboards</h3>
                
                {/* Dashboards List */}
                <div className="space-y-3">
                  {dashboards[selectedService.id]?.map((dashboard) => (
                    <div
                      key={dashboard.id}
                      onClick={() => handleDashboardClick(dashboard)}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Analytics Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-dashed border-gray-300 relative overflow-hidden">
                          {/* Placeholder Icon */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                        
                        {/* Dashboard Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {dashboard.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{dashboard.description}</p>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex-shrink-0">
                          <ArrowRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Dashboards */}
                {(!dashboards[selectedService.id] || dashboards[selectedService.id].length === 0) && (
                  <div className="text-center py-12">
                    <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No dashboards available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This service doesn't have any analytics dashboards yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Detail Modal */}
      {showDashboardDetailModal && selectedDashboard && selectedService && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="w-full h-full flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200 bg-gray-50">
              <button
                onClick={closeDashboardDetailModal}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedDashboard.name}</h2>
                <p className="text-sm text-gray-600">{selectedService.name} by {selectedService.department} from {selectedService.division}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="w-full">
                {/* Dashboard Sections - Blank for now */}
                <div className="space-y-6">
                  {/* Section 1 */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Section 1</h3>
                    <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">Content will be added here</p>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Section 2</h3>
                    <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">Content will be added here</p>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Section 3</h3>
                    <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">Content will be added here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
