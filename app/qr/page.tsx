'use client'

import { useState, useEffect } from 'react'
import { Filter, Clock, User, Building2, Calendar, FileText } from 'lucide-react'
import { Header } from '@/components/home/Header'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'
import { User as UserType } from '@/types'
import QRCode from 'qrcode'

// QR Transaction interface
interface QRTransaction {
  id: string
  type: 'attendance' | 'medicine' | 'laboratory' | 'consultation' | 'procedure'
  title: string
  referenceNumber?: string
  location: string
  timestamp: Date
  status: 'completed' | 'pending' | 'cancelled'
  description: string
}

export default function QRPage() {
  // Mock user data (in real app, this comes from authentication)
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

  // Mock QR transaction data
  const [transactions] = useState<QRTransaction[]>([
    {
      id: '1',
      type: 'attendance',
      title: 'Monthly Department Meeting',
      location: 'Conference Room A, 3rd Floor',
      timestamp: new Date('2024-01-15T08:00:00'),
      status: 'completed',
      description: 'Monthly review of department performance and upcoming projects'
    },
    {
      id: '2',
      type: 'medicine',
      title: 'Medicine Availment',
      referenceNumber: 'PH-2024-001234',
      location: 'Pharmacy Department, Ground Floor',
      timestamp: new Date('2024-01-14T14:30:00'),
      status: 'completed',
      description: 'Free medicine package for healthcare workers'
    },
    {
      id: '3',
      type: 'laboratory',
      title: 'Blood Test',
      referenceNumber: 'LAB-2024-005678',
      location: 'Clinical Laboratory, 2nd Floor',
      timestamp: new Date('2024-01-13T10:15:00'),
      status: 'completed',
      description: 'Annual health checkup blood work'
    },
    {
      id: '4',
      type: 'attendance',
      title: 'Emergency Response Training',
      location: 'Training Hall, 4th Floor',
      timestamp: new Date('2024-01-12T13:00:00'),
      status: 'completed',
      description: 'CPR and emergency response procedures training'
    },
    {
      id: '5',
      type: 'consultation',
      title: 'Annual Physical Examination',
      referenceNumber: 'CON-2024-009876',
      location: 'Employee Health Clinic, 1st Floor',
      timestamp: new Date('2024-01-11T09:00:00'),
      status: 'completed',
      description: 'Routine annual health assessment'
    },
    {
      id: '6',
      type: 'medicine',
      title: 'Medicine Availment',
      referenceNumber: 'PH-2024-001111',
      location: 'Pharmacy Department, Ground Floor',
      timestamp: new Date('2024-01-10T16:45:00'),
      status: 'completed',
      description: 'Prescription medication refill'
    },
    {
      id: '7',
      type: 'procedure',
      title: 'X-Ray Examination',
      referenceNumber: 'RAD-2024-002222',
      location: 'Radiology Department, 2nd Floor',
      timestamp: new Date('2024-01-09T11:20:00'),
      status: 'completed',
      description: 'Chest X-ray for health clearance'
    },
    {
      id: '8',
      type: 'attendance',
      title: 'Quality Improvement Workshop',
      location: 'Seminar Room B, 3rd Floor',
      timestamp: new Date('2024-01-08T14:00:00'),
      status: 'completed',
      description: 'Workshop on improving patient care quality'
    }
  ])

  // State for filtering
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // State for QR code
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  // Generate QR code when component mounts
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Generate QR code with employee ID and name
        const qrData = JSON.stringify({
          employeeId: currentUser.employeeId,
          name: currentUser.name,
          department: currentUser.department,
          timestamp: new Date().toISOString()
        })
        
        const dataUrl = await QRCode.toDataURL(qrData, {
          width: 256,
          margin: 2,
          color: {
            dark: '#6c5ce7', // Primary purple color
            light: '#ffffff'
          }
        })
        setQrCodeDataUrl(dataUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }
    
    generateQRCode()
  }, [currentUser.employeeId, currentUser.name, currentUser.department])

  // Get unique transaction types and statuses for filters
  const transactionTypes = ['all', ...Array.from(new Set(transactions.map(t => t.type)))]
  const transactionStatuses = ['all', ...Array.from(new Set(transactions.map(t => t.status)))]

  // Filter transactions based on filters
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
      return matchesType && matchesStatus
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Most recent first

  const handleNotificationClick = () => {
    alert('Opening notifications...')
  }

  const handleProfileClick = () => {
    alert('Opening profile...')
  }

  const handleNavigationClick = (moduleName: string) => {
    if (moduleName === 'home') {
      window.location.href = '/home'
    } else if (moduleName === 'services') {
      window.location.href = '/services'
    } else if (moduleName === 'qr') {
      return // Already on QR page
    } else if (moduleName === 'latest') {
      alert('Navigating to Latest module...')
    } else if (moduleName === 'others') {
      alert('Navigating to Others module...')
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Clock className="w-4 h-4" />
      case 'medicine':
        return <FileText className="w-4 h-4" />
      case 'laboratory':
        return <Building2 className="w-4 h-4" />
      case 'consultation':
        return <User className="w-4 h-4" />
      case 'procedure':
        return <Building2 className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'medicine':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'laboratory':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'consultation':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'procedure':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'Attendance'
      case 'medicine':
        return 'Medicine'
      case 'laboratory':
        return 'Laboratory'
      case 'consultation':
        return 'Consultation'
      case 'procedure':
        return 'Procedure'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'pending':
        return 'Pending'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Unknown'
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component - Same as Home and Services Modules */}
      <Header 
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        notificationCount={3}
        userName={currentUser.name}
        userAvatar={currentUser.avatar}
      />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* QR Code Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My QR</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Show this QR code to any hospital staff for transactions that require verification, 
            such as meeting attendance, medicine availment, laboratory services, consultations, 
            or any other hospital services.
          </p>
          
          {/* QR Code Display */}
          <div className="bg-gray-100 rounded-xl p-8 mx-auto w-64 h-64 flex items-center justify-center mb-4">
            {qrCodeDataUrl ? (
              <div className="text-center">
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code" 
                  className="w-48 h-48 mx-auto mb-3"
                />
                <p className="text-sm text-gray-500">Scan to verify</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-gray-300">
                  <span className="text-xs text-gray-500">Generating QR...</span>
                </div>
                <p className="text-sm text-gray-500">Please wait</p>
              </div>
            )}
          </div>
          
          {/* Employee ID */}
          <div className="bg-gray-50 rounded-lg p-3 inline-block">
            <span className="text-sm text-gray-600">Employee ID: </span>
            <span className="text-sm font-semibold text-gray-900">{currentUser.employeeId}</span>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="space-y-4">
          {/* Header and Filter */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">My QR Transaction History</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Filter</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {transactionTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : getTypeText(type)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {transactionStatuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : getStatusText(status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  {/* Transaction Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(transaction.type)}`}>
                    {getTypeIcon(transaction.type)}
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 truncate">
                        {transaction.title}
                      </h4>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(transaction.type)}`}>
                        {getTypeText(transaction.type)}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      {transaction.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Building2 className="w-3 h-3" />
                        <span>{transaction.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatTimestamp(transaction.timestamp)}</span>
                      </div>
                      {transaction.referenceNumber && (
                        <div className="flex items-center space-x-1">
                          <FileText className="w-3 h-3" />
                          <span>Ref: {transaction.referenceNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions found matching your criteria.</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Horizontal Navigation Bar - QR highlighted */}
      <HorizontalNavigationBar 
        currentModule="qr"
        onNavigationClick={handleNavigationClick}
      />
    </div>
  )
}
