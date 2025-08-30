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

  // Mock analytics microservices data
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
      name: 'Intelliflow',
      description: 'Patient Flow and Queue Management System',
      division: 'Medical Division',
      department: 'DHIU',
      logo: '/icons/placeholder.svg',
      availableDashboards: 2,
      lastUpdated: new Date('2024-01-15T09:00:00Z')
    },
    {
      id: '3',
      name: 'PharmTrack',
      description: 'Pharmacy Inventory and Prescription Management',
      division: 'Allied Health Division',
      department: 'Pharmacy',
      logo: '/icons/placeholder.svg',
      availableDashboards: 4,
      lastUpdated: new Date('2024-01-15T08:30:00Z')
    },
    {
      id: '4',
      name: 'LabConnect',
      description: 'Laboratory Information Management System',
      division: 'Allied Health Division',
      department: 'Pathology',
      logo: '/icons/placeholder.svg',
      availableDashboards: 3,
      lastUpdated: new Date('2024-01-15T08:15:00Z')
    },
    {
      id: '5',
      name: 'HRPortal',
      description: 'Human Resource Management System',
      division: 'Hospital Operations',
      department: 'HRM',
      logo: '/icons/placeholder.svg',
      availableDashboards: 5,
      lastUpdated: new Date('2024-01-15T07:45:00Z')
    },
    {
      id: '6',
      name: 'FinanceFlow',
      description: 'Financial Management and Billing System',
      division: 'Finance Service',
      department: 'Accounting',
      logo: '/icons/placeholder.svg',
      availableDashboards: 4,
      lastUpdated: new Date('2024-01-15T07:30:00Z')
    }
  ])

  // Mock dashboards data
  const [dashboards] = useState<Record<string, Dashboard[]>>({
    '1': [
      { id: '1-1', name: 'Animal Bite Statistics Dashboard', description: 'Comprehensive view of animal bite cases and trends', type: 'analytics' }
    ],
    '2': [
      { id: '2-1', name: 'Patient Flow Capacity Dashboard', description: 'Real-time monitoring of patient flow and queue management across all process steps', type: 'patient-flow' },
      { id: '2-2', name: 'Queue Tracker', description: 'Live tracking of queue numbers and waiting times at each step', type: 'queue' }
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

  // State for active tab in Patient Flow Capacity Dashboard
  const [activeTab, setActiveTab] = useState('total');

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
      <Header 
        onNotificationClick={() => {}} 
        onProfileClick={() => {}} 
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
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
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
              {selectedDashboard.id === '2-1' ? (
                // Patient Flow Capacity Dashboard Content
                <div className="w-full space-y-6">
                  {/* Section 1: Real-Time Dashboard Header */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Patient Flow Capacity Dashboard</h3>
                      <div className="text-sm text-gray-600">
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} • {new Date().toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          second: '2-digit',
                          hour12: true 
                        })}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Real-time monitoring of patient flow and queue management across all process steps</p>
                  </div>

                  {/* Section 2: Step 1 - Security Check */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1 - Security Check</h3>
                    
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 mb-6">
                      <nav className="-mb-px flex space-x-8">
                        <button
                          onClick={() => setActiveTab('total')}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'total'
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Total
                        </button>
                        <button
                          onClick={() => setActiveTab('triage1')}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'triage1'
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Triage 1
                        </button>
                        <button
                          onClick={() => setActiveTab('triage2')}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'triage2'
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Triage 2
                        </button>
                      </nav>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'total' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {/* Total Queue Released */}
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-blue-600">Total Queue Released</p>
                                <p className="text-2xl font-bold text-blue-900">156</p>
                                <p className="text-xs text-blue-600">Today</p>
                              </div>
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-lg">Q</span>
                              </div>
                            </div>
                          </div>

                          {/* Active Staff */}
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-green-600">Active Staff</p>
                                <p className="text-2xl font-bold text-green-900">3</p>
                                <p className="text-xs text-green-600">Security Officers</p>
                              </div>
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 font-bold text-lg">👮</span>
                              </div>
                            </div>
                          </div>

                          {/* Current Status */}
                          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-purple-600">Current Status</p>
                                <p className="text-2xl font-bold text-purple-900">Active</p>
                                <p className="text-xs text-purple-600">All Areas</p>
                              </div>
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 font-bold text-lg">✓</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Staff Details */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Staff on Duty</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-blue-600 font-bold">👮</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900">Guard Santos</p>
                              <p className="text-xs text-gray-600">Triage 1 Area</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">Active</span>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-green-600 font-bold">👮</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900">Guard Cruz</p>
                              <p className="text-xs text-gray-600">Triage 2 Area</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">Active</span>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-purple-600 font-bold">👮</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900">Guard Reyes</p>
                              <p className="text-xs text-gray-600">Floating</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">Active</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'triage1' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {/* Triage 1 Queue Released */}
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-blue-600">Queue Released</p>
                                <p className="text-2xl font-bold text-blue-900">78</p>
                                <p className="text-xs text-blue-600">Triage 1 Only</p>
                              </div>
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-lg">Q1</span>
                              </div>
                            </div>
                          </div>

                          {/* Triage 1 Staff */}
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-green-600">Active Staff</p>
                                <p className="text-2xl font-bold text-green-900">2</p>
                                <p className="text-xs text-green-600">Security Officers</p>
                              </div>
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 font-bold text-lg">👮</span>
                              </div>
                            </div>
                          </div>

                          {/* Triage 1 Status */}
                          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-purple-600">Status</p>
                                <p className="text-2xl font-bold text-purple-900">Active</p>
                                <p className="text-xs text-purple-600">Triage 1 Area</p>
                              </div>
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 font-bold text-lg">✓</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Triage 1 Staff Details */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Triage 1 Staff on Duty</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-blue-600 font-bold">👮</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900">Guard Santos</p>
                              <p className="text-xs text-gray-600">Main Gate</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">Active</span>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-green-600 font-bold">👮</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900">Guard Cruz</p>
                              <p className="text-xs text-gray-600">Entrance</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">Active</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'triage2' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {/* Triage 2 Queue Released */}
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-blue-600">Queue Released</p>
                                <p className="text-2xl font-bold text-blue-900">78</p>
                                <p className="text-xs text-blue-600">Triage 2 Only</p>
                              </div>
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-lg">Q2</span>
                              </div>
                            </div>
                          </div>

                          {/* Triage 2 Staff */}
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-green-600">Active Staff</p>
                                <p className="text-2xl font-bold text-green-900">1</p>
                                <p className="text-xs text-green-600">Security Officer</p>
                              </div>
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 font-bold text-lg">👮</span>
                              </div>
                            </div>
                          </div>

                          {/* Triage 2 Status */}
                          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-purple-600">Status</p>
                                <p className="text-2xl font-bold text-purple-900">Active</p>
                                <p className="text-xs text-purple-600">Triage 2 Area</p>
                              </div>
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 font-bold text-lg">✓</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Triage 2 Staff Details */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Triage 2 Staff on Duty</h4>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">👮</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">Guard Reyes</p>
                            <p className="text-xs text-gray-600">Main Entrance</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">Active</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Default dashboard content for other dashboards
                <div className="text-center py-12">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Dashboard Details</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Dashboard details will be displayed here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
