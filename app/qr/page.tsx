'use client'

import { useState, useEffect } from 'react'
import { Filter, Clock, User, Building2, Calendar, FileText, Search } from 'lucide-react'
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
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  
  // State for QR code
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  // State for scan modal
  const [showScanModal, setShowScanModal] = useState(false)
  const [scanResult, setScanResult] = useState<string>('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [showOTPInput, setShowOTPInput] = useState(false)
  const [scannedEventData, setScannedEventData] = useState<any>(null)
  const [otpInput, setOtpInput] = useState<string>('')
  const [otpError, setOtpError] = useState<string>('')

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
      
             // Date filtering
       let matchesDate = true
       if (dateFrom) {
         // Convert MM/DD/YYYY to YYYY-MM-DD for comparison
         const parts = dateFrom.split('/')
         if (parts.length === 3) {
           const month = parts[0].padStart(2, '0')
           const day = parts[1].padStart(2, '0')
           const year = parts[2]
           const fromDate = new Date(`${year}-${month}-${day}`)
           fromDate.setHours(0, 0, 0, 0)
           if (transaction.timestamp < fromDate) {
             matchesDate = false
           }
         }
       }
       if (dateTo) {
         // Convert MM/DD/YYYY to YYYY-MM-DD for comparison
         const parts = dateTo.split('/')
         if (parts.length === 3) {
           const month = parts[0].padStart(2, '0')
           const day = parts[1].padStart(2, '0')
           const year = parts[2]
           const toDate = new Date(`${year}-${month}-${day}`)
           toDate.setHours(23, 59, 59, 999)
           if (transaction.timestamp > toDate) {
             matchesDate = false
           }
         }
       }
      
      return matchesType && matchesStatus && matchesDate
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
    } else if (moduleName === 'analytics') {
      alert('Navigating to Analytics module...')
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

  const clearAllFilters = () => {
    setTypeFilter('all')
    setStatusFilter('all')
    setDateFrom('')
    setDateTo('')
  }

  // Scan QR functionality
  const handleScanQR = () => {
    setShowScanModal(true)
    setScanResult('')
    setIsScanning(false)
    setScanSuccess(false)
  }

  const handleScanSuccess = (scannedData: string) => {
    try {
      // Parse the scanned QR data (assuming it's JSON)
      const parsedData = JSON.parse(scannedData)
      
      // Check if it's a valid event QR code
      if (parsedData.eventId && parsedData.eventName && parsedData.otp) {
        // Store the scanned data and show OTP input
        setScannedEventData(parsedData)
        setShowOTPInput(true)
        setOtpInput('')
        setOtpError('')
      } else {
        setScanResult('Invalid QR code format. Please scan a valid event QR code.')
      }
    } catch (error) {
      setScanResult('Error reading QR code. Please try again.')
    }
  }

  const validateOTP = (otp: string): boolean => {
    // In real app, this would validate with backend
    // For demo, accept any 6-digit OTP
    return /^\d{6}$/.test(otp)
  }

  const handleOTPSubmit = () => {
    if (!scannedEventData) return
    
    // Validate OTP input
    if (!otpInput.trim()) {
      setOtpError('Please enter the OTP')
      return
    }
    
    if (otpInput.trim() === scannedEventData.otp) {
      // OTP is valid - mark attendance
      setScanSuccess(true)
      setScanResult(`Successfully marked attendance for ${scannedEventData.eventName}`)
      setShowOTPInput(false)
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowScanModal(false)
        setScanSuccess(false)
        setScanResult('')
        setScannedEventData(null)
        setOtpInput('')
        setOtpError('')
      }, 2000)
    } else {
      setOtpError('Invalid OTP. Please check and try again.')
    }
  }

  const resetScanProcess = () => {
    setShowScanModal(false)
    setScanResult('')
    setIsScanning(false)
    setScanSuccess(false)
    setShowOTPInput(false)
    setScannedEventData(null)
    setOtpInput('')
    setOtpError('')
  }

  const simulateQRScan = () => {
    setIsScanning(true)
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      
      // Simulate successful scan with demo data
      const demoEventData = {
        eventId: 'EVT-2024-001',
        eventName: 'Monthly Department Meeting',
        location: 'Conference Room A, 3rd Floor',
        otp: '789456',
        timestamp: new Date().toISOString()
      }
      
      handleScanSuccess(JSON.stringify(demoEventData))
    }, 2000)
  }

  // Helper function to convert MM/DD/YYYY to Date object
  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('/')
    if (parts.length === 3) {
      const month = parseInt(parts[0]) - 1 // Month is 0-indexed in Date constructor
      const day = parseInt(parts[1])
      const year = parseInt(parts[2])
      const date = new Date(year, month, day)
      if (!isNaN(date.getTime()) && date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return date
      }
    }
    return null
  }

  // Helper function to validate MM/DD/YYYY format
  const isValidDateFormat = (dateString: string): boolean => {
    if (!dateString) return true
    const date = parseDate(dateString)
    if (!date) return false
    
    // Check if date is not in the future
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    return date <= today
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
           <div className="bg-gray-50 rounded-lg p-3 inline-block mb-6">
             <span className="text-sm text-gray-600">Employee ID: </span>
             <span className="text-sm font-semibold text-gray-900">{currentUser.employeeId}</span>
           </div>

           {/* Scan QR Button */}
           <div className="space-y-4">
             <div className="w-full h-px bg-gray-200"></div>
             <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan QR for Attendance</h3>
               <p className="text-gray-600 text-sm mb-4">
                 Scan QR codes from meetings, lectures, or events to mark your attendance
               </p>
               <button
                 onClick={handleScanQR}
                 className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
               >
                 <Search className="w-5 h-5" />
                 <span>Scan QR Code</span>
               </button>
             </div>
           </div>
         </div>

        {/* Transaction History Section */}
        <div className="space-y-4">
          {/* Header and Filter */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">My QR Transaction History</h3>
                         <button
               onClick={() => setShowFilters(!showFilters)}
               className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 relative"
             >
               <Filter className="w-4 h-4 text-gray-600" />
               <span className="text-sm text-gray-700">Filter</span>
               {/* Active filters indicator */}
               {(typeFilter !== 'all' || statusFilter !== 'all' || dateFrom || dateTo) && (
                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
               )}
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

               {/* Date Range Filters */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Date From */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                   <div className="relative">
                     <input
                       type="text"
                       placeholder="MM/DD/YYYY"
                       value={dateFrom}
                       onChange={(e) => {
                         const value = e.target.value
                         // Allow only numbers and forward slashes
                         if (/^[\d/]*$/.test(value)) {
                           setDateFrom(value)
                         }
                       }}
                       onBlur={(e) => {
                         const value = e.target.value
                         if (value && !isValidDateFormat(value)) {
                           setDateFrom('') // Clear invalid date
                         }
                       }}
                       className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                         dateFrom && !isValidDateFormat(dateFrom) 
                           ? 'border-red-300 bg-red-50' 
                           : 'border-gray-300'
                       }`}
                       maxLength={10}
                     />
                     <input
                       type="date"
                       onChange={(e) => {
                         if (e.target.value) {
                           const date = new Date(e.target.value)
                           const month = (date.getMonth() + 1).toString().padStart(2, '0')
                           const day = date.getDate().toString().padStart(2, '0')
                           const year = date.getFullYear()
                           setDateFrom(`${month}/${day}/${year}`)
                         }
                       }}
                       max={dateTo ? (() => {
                         const parts = dateTo.split('/')
                         if (parts.length === 3) {
                           return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`
                         }
                         return undefined
                       })() : new Date().toISOString().split('T')[0]}
                       className="absolute right-0 top-0 w-8 h-full opacity-0 cursor-pointer"
                     />
                     <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                   </div>
                   {dateFrom && !isValidDateFormat(dateFrom) && (
                     <p className="text-xs text-red-500 mt-1">Please enter a valid date (MM/DD/YYYY)</p>
                   )}
                 </div>

                 {/* Date To */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                   <div className="relative">
                     <input
                       type="text"
                       placeholder="MM/DD/YYYY"
                       value={dateTo}
                       onChange={(e) => {
                         const value = e.target.value
                         // Allow only numbers and forward slashes
                         if (/^[\d/]*$/.test(value)) {
                           setDateTo(value)
                         }
                       }}
                       onBlur={(e) => {
                         const value = e.target.value
                         if (value && !isValidDateFormat(value)) {
                           setDateTo('') // Clear invalid date
                         }
                       }}
                       className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                         dateTo && !isValidDateFormat(dateTo) 
                           ? 'border-red-300 bg-red-50' 
                           : 'border-gray-300'
                       }`}
                       maxLength={10}
                     />
                     <input
                       type="date"
                       onChange={(e) => {
                         if (e.target.value) {
                           const date = new Date(e.target.value)
                           const month = (date.getMonth() + 1).toString().padStart(2, '0')
                           const day = date.getDate().toString().padStart(2, '0')
                           const year = date.getFullYear()
                           setDateTo(`${month}/${day}/${year}`)
                         }
                       }}
                       min={dateFrom ? (() => {
                         const parts = dateFrom.split('/')
                         if (parts.length === 3) {
                           return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`
                         }
                         return undefined
                       })() : undefined}
                       max={new Date().toISOString().split('T')[0]}
                       className="absolute right-0 top-0 w-8 h-full opacity-0 cursor-pointer"
                     />
                     <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                   </div>
                   {dateTo && !isValidDateFormat(dateTo) && (
                     <p className="text-xs text-red-500 mt-1">Please enter a valid date (MM/DD/YYYY)</p>
                   )}
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

       {/* Scan QR Modal */}
       {showScanModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-xl p-6 w-full max-w-md">
             <div className="text-center">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Scan QR Code</h3>
               
                               {!isScanning && !scanResult && !showOTPInput && (
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                      <Search className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-gray-600">
                      Point your camera at the QR code to scan
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={simulateQRScan}
                        className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors duration-200"
                      >
                        Simulate QR Scan (Demo)
                      </button>
                      <button
                        onClick={resetScanProcess}
                        className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                                 {showOTPInput && (
                   <div className="space-y-4">
                     <div className="bg-blue-100 rounded-xl p-6 text-center">
                       <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                         <span className="text-2xl text-blue-600">✓</span>
                       </div>
                       <h4 className="font-semibold text-blue-900 mb-1">QR Code Valid!</h4>
                       <p className="text-sm text-blue-700">
                         {scannedEventData?.eventName}
                       </p>
                       <p className="text-xs text-blue-600 mt-1">
                         {scannedEventData?.location}
                       </p>
                     </div>
                     
                     {/* Demo OTP Hint */}
                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                       <p className="text-xs text-yellow-700 mb-1">💡 Demo Mode</p>
                       <p className="text-sm font-mono font-semibold text-yellow-800">
                         Enter OTP: <span className="text-lg">{scannedEventData?.otp}</span>
                       </p>
                     </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                          Enter OTP from QR Code
                        </label>
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otpInput}
                          onChange={(e) => {
                            const value = e.target.value
                            if (/^\d{0,6}$/.test(value)) {
                              setOtpInput(value)
                              setOtpError('')
                            }
                          }}
                          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg font-mono ${
                            otpError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          maxLength={6}
                          autoFocus
                        />
                        {otpError && (
                          <p className="text-xs text-red-500 mt-1 text-left">{otpError}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <button
                          onClick={handleOTPSubmit}
                          className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors duration-200"
                        >
                          Verify OTP & Mark Attendance
                        </button>
                        <button
                          onClick={resetScanProcess}
                          className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

               {isScanning && (
                 <div className="space-y-4">
                   <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                   </div>
                   <p className="text-gray-600">Scanning QR code...</p>
                 </div>
               )}

               {scanResult && (
                 <div className="space-y-4">
                   <div className={`rounded-xl p-8 flex items-center justify-center ${
                     scanSuccess ? 'bg-green-100' : 'bg-red-100'
                   }`}>
                     {scanSuccess ? (
                       <div className="text-green-600 text-center">
                         <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                           <span className="text-2xl">✓</span>
                         </div>
                         <p className="text-sm">Success!</p>
                       </div>
                     ) : (
                       <div className="text-red-600 text-center">
                         <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
                           <span className="text-xl">✗</span>
                         </div>
                         <p className="text-sm">Error</p>
                       </div>
                     )}
                   </div>
                   <p className={`text-sm ${scanSuccess ? 'text-green-600' : 'text-red-600'}`}>
                     {scanResult}
                   </p>
                   {!scanSuccess && (
                     <button
                       onClick={() => setShowScanModal(false)}
                       className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                     >
                       Close
                     </button>
                   )}
                 </div>
               )}
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }
