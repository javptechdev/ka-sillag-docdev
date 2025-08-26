'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/home/Header'
import { Greetings } from '@/components/home/Greetings'
import { FeatureServices } from '@/components/home/FeatureServices'
import { Divisions } from '@/components/home/Divisions'
import { LatestAnnouncements } from '@/components/home/LatestAnnouncements'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'
// These modals are not needed for the Home Module
// import { ForgotCredentialsModal } from '@/components/ForgotCredentialsModal'
// import { RequestAccountModal } from '@/components/RequestAccountModal'
import { DivisionModal } from '@/components/home/DivisionModal'
import { AnnouncementModal } from '@/components/home/AnnouncementModal'
import { ProfileModal } from '@/components/home/ProfileModal'
import { NotificationsModal } from '@/components/home/NotificationsModal'
import { User, Department as DepartmentType, Announcement } from '@/types'

// Types based on our concept plans
interface Service {
  id: string
  name: string
  logo: string
  status: 'active' | 'denied' | 'soon'
  description?: string
}

interface Division {
  id: string
  name: string
  logo: string
  description?: string
  departments: DepartmentLocal[]
}

interface DepartmentLocal {
  id: string
  name: string
  logo: string
  description?: string
  unitServices: UnitService[]
}

interface UnitService {
  id: string
  name: string
  logo: string
  status: 'active' | 'denied' | 'soon'
  description?: string
}



export default function HomePage() {
  // State management for modals and data
  const [showDivisionModal, setShowDivisionModal] = useState(false)
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  
  // Selected items for modals
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  
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

  // Mock data based on our concept plans
  const [featureServices] = useState<Service[]>([
    {
      id: '1',
      name: 'IntelliFlow',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'Intelligent Patient Flow and Queue Management System'
    },
    {
      id: '2',
      name: 'aISO',
      logo: '/icons/placeholder.svg',
      status: 'denied',
      description: 'AI Powered Document Management System (DMS) with Chatbot (RAG)'
    },
    {
      id: '3',
      name: 'AiBTC',
      logo: '/icons/placeholder.svg',
      status: 'soon',
      description: 'Intelligent Animal Bite Appointment System (RAG)'
    },
    {
      id: '4',
      name: 'IntelliFerral',
      logo: '/icons/placeholder.svg',
      status: 'active',
      description: 'Intelligent Clinic Referral System (RAG)'
    },
    {
      id: '5',
      name: 'IntelliPath',
      logo: '/icons/placeholder.svg',
      status: 'denied',
      description: 'Intelligent Clinical Pathway Recommender System (RAG)'
    },
    {
      id: '6',
      name: 'IntelliMent',
      logo: '/icons/placeholder.svg',
      status: 'soon',
      description: 'Realtime Intelligent Client Satisfaction Monitoring System (Sentiment Analysis LLM)'
    }
  ])

  const [divisions] = useState<Division[]>([
    {
      id: '1',
      name: 'Office of the Medical Center Chief Services',
      logo: '/icons/placeholder.svg',
      description: 'Administrative and leadership services',
      departments: [
        {
          id: '1',
          name: 'Executive Office',
          logo: '/icons/placeholder.svg',
          description: 'Office of the Medical Center Chief',
          unitServices: [
            { id: '1', name: 'Strategic Planning', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '2', name: 'Policy Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Medical Services',
      logo: '/icons/placeholder.svg',
      description: 'Core medical care and treatment',
      departments: [
        {
          id: '2',
          name: 'Cardiology',
          logo: '/icons/placeholder.svg',
          description: 'Cardiovascular care and treatment',
          unitServices: [
            { id: '3', name: 'ECG Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '4', name: 'Echocardiography', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '3',
          name: 'Pediatrics',
          logo: '/icons/placeholder.svg',
          description: 'Child and adolescent care',
          unitServices: [
            { id: '5', name: 'Child Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '6', name: 'Vaccination', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Nursing Services',
      logo: '/icons/placeholder.svg',
      description: 'Patient care and nursing management',
      departments: [
        {
          id: '4',
          name: 'ICU',
          logo: '/icons/placeholder.svg',
          description: 'Intensive Care Unit',
          unitServices: [
            { id: '7', name: 'Critical Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '8', name: 'Ventilator Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Allied Health Professional Services',
      logo: '/icons/placeholder.svg',
      description: 'Supporting healthcare professionals',
      departments: [
        {
          id: '5',
          name: 'Laboratory',
          logo: '/icons/placeholder.svg',
          description: 'Clinical laboratory services',
          unitServices: [
            { id: '9', name: 'Blood Tests', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '10', name: 'Urinalysis', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '5',
      name: 'Hospital Operations and Patient Support Services',
      logo: '/icons/placeholder.svg',
      description: 'Hospital operations and patient assistance',
      departments: [
        {
          id: '6',
          name: 'Patient Relations',
          logo: '/icons/placeholder.svg',
          description: 'Patient support and relations',
          unitServices: [
            { id: '11', name: 'Patient Support', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '12', name: 'Complaints Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '6',
      name: 'Finance Services',
      logo: '/icons/placeholder.svg',
      description: 'Financial management and billing',
      departments: [
        {
          id: '7',
          name: 'Accounting',
          logo: '/icons/placeholder.svg',
          description: 'Financial accounting services',
          unitServices: [
            { id: '13', name: 'Financial Reports', logo: '/icons/placeholder.svg', status: 'denied' },
            { id: '14', name: 'Budget Management', logo: '/icons/placeholder.svg', status: 'denied' }
          ]
        }
      ]
    },
    {
      id: '7',
      name: 'BUCAS Tubao Services',
      logo: '/icons/placeholder.svg',
      description: 'Branch unit services in Tubao',
      departments: [
        {
          id: '8',
          name: 'Local Medical Services',
          logo: '/icons/placeholder.svg',
          description: 'Local medical care in Tubao',
          unitServices: [
            { id: '15', name: 'Local Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '16', name: 'Emergency Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '8',
      name: 'BUCAS Bangar Services',
      logo: '/icons/placeholder.svg',
      description: 'Branch unit services in Bangar',
      departments: [
        {
          id: '9',
          name: 'Local Medical Services',
          logo: '/icons/placeholder.svg',
          description: 'Local medical care in Bangar',
          unitServices: [
            { id: '17', name: 'Local Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '18', name: 'Emergency Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    }
  ])

  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'New Hospital Policy Update',
      content: 'Important changes to patient care procedures have been implemented. All healthcare workers are required to review the updated protocols by the end of this week. The new procedures focus on improving patient safety and care quality.',
      addedBy: 'Dr. Maria Santos Cruz',
      addedByDepartment: 'Internal Medicine',
      addedTimestamp: new Date('2024-01-15T09:00:00'),
      commentCount: 5,
      loveCount: 12,
      isLovedByUser: false
    },
    {
      id: '2',
      title: 'Staff Training Schedule',
      content: 'Mandatory training sessions for all nursing staff will be conducted next week. Please check your email for your assigned schedule. Attendance is required for all shifts.',
      addedBy: 'Nurse Juan Dela Cruz',
      addedByDepartment: 'Emergency Room',
      addedTimestamp: new Date('2024-01-14T14:30:00'),
      commentCount: 8,
      loveCount: 15,
      isLovedByUser: true
    },
    {
      id: '3',
      title: 'Equipment Maintenance Notice',
      content: 'Scheduled maintenance for radiology equipment will take place this weekend. Some services may be temporarily unavailable. We apologize for any inconvenience.',
      addedBy: 'Engr. Roberto Santos',
      addedByDepartment: 'Maintenance Department',
      addedTimestamp: new Date('2024-01-13T16:00:00'),
      commentCount: 3,
      loveCount: 7,
      isLovedByUser: false
    },
    {
      id: '4',
      title: 'Holiday Schedule Update',
      content: 'Updated holiday schedule for the upcoming month has been posted. Please review your assigned shifts and contact your supervisor if you have any conflicts.',
      addedBy: 'Admin Ana Reyes',
      addedByDepartment: 'Administration',
      addedTimestamp: new Date('2024-01-12T11:00:00'),
      commentCount: 12,
      loveCount: 25,
      isLovedByUser: false
    },
    {
      id: '5',
      title: 'Quality Improvement Initiative',
      content: 'New quality improvement program launching next month. All departments will participate in this initiative to enhance patient care standards and operational efficiency.',
      addedBy: 'Dr. Luzviminda Garcia',
      addedByDepartment: 'Quality Assurance',
      addedTimestamp: new Date('2024-01-11T10:00:00'),
      commentCount: 6,
      loveCount: 18,
      isLovedByUser: true
    }
  ])

  // Event handlers
  const handleServiceClick = (serviceId: string) => {
    const service = featureServices.find(s => s.id === serviceId)
    if (service) {
      if (service.status === 'active') {
        // In real app, redirect to service
        alert(`Redirecting to ${service.name}...`)
      } else if (service.status === 'denied') {
        alert('Access Denied: You do not have permission to access this service.')
      } else {
        alert('Coming Soon: This service will be available soon!')
      }
    }
  }

  const handleSeeAllServices = () => {
    // In real app, navigate to Services Module
    alert('Navigating to Services Module...')
  }

  const handleDivisionClick = (divisionId: string) => {
    const division = divisions.find(d => d.id === divisionId)
    if (division) {
      setSelectedDivision(division)
      setShowDivisionModal(true)
    }
  }

  const handleAnnouncementClick = (announcementId: string) => {
    const announcement = announcements.find(a => a.id === announcementId)
    if (announcement) {
      setSelectedAnnouncement(announcement)
      setShowAnnouncementModal(true)
    }
  }

  const handleSeeAllAnnouncements = () => {
    // In real app, navigate to Latest Module
    alert('Navigating to Latest Module...')
  }

  const handleNavigationClick = (moduleName: string) => {
    // In real app, navigate to different modules
    alert(`Navigating to ${moduleName} module...`)
  }

  const handleNotificationClick = () => {
    setShowNotificationsModal(true)
  }

  const handleProfileClick = () => {
    setShowProfileModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header 
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        notificationCount={3}
        userName={currentUser.name}
        userAvatar={currentUser.avatar}
      />

      {/* Main Content */}
      <main className="px-4 py-6 space-y-8">
        {/* Greetings Component */}
        <Greetings name={currentUser.name} />

        {/* Feature Services Component */}
        <FeatureServices 
          services={featureServices}
          onServiceClick={handleServiceClick}
          onSeeAllClick={handleSeeAllServices}
        />

        {/* Divisions Component */}
        <Divisions 
          divisions={divisions}
          onDivisionClick={handleDivisionClick}
        />

        {/* Latest Announcements Component */}
        <LatestAnnouncements 
          announcements={announcements}
          onAnnouncementClick={handleAnnouncementClick}
          onSeeAllClick={handleSeeAllAnnouncements}
        />
      </main>

      {/* Horizontal Navigation Bar */}
      <HorizontalNavigationBar 
        currentModule="home"
        onNavigationClick={handleNavigationClick}
      />

      {/* Modals */}
      <DivisionModal 
        isOpen={showDivisionModal}
        division={selectedDivision}
        onClose={() => setShowDivisionModal(false)}
      />

      <AnnouncementModal 
        isOpen={showAnnouncementModal}
        announcement={selectedAnnouncement}
        onClose={() => setShowAnnouncementModal(false)}
      />

      <ProfileModal 
        isOpen={showProfileModal}
        user={currentUser}
        onClose={() => setShowProfileModal(false)}
      />

      <NotificationsModal 
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />
    </div>
  )
}
