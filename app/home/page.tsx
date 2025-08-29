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
      name: 'Office of the Medical Center Chief',
      logo: '/icons/placeholder.svg',
      description: 'Administrative and leadership services',
      departments: [
        {
          id: '1.1',
          name: 'Professional Education, Training & Research Unit',
          logo: '/icons/placeholder.svg',
          description: 'Professional development and research initiatives',
          unitServices: [
            { id: '1', name: 'Training Programs', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '2', name: 'Research Projects', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.2',
          name: 'Center for Public Health and Primary Health Care',
          logo: '/icons/placeholder.svg',
          description: 'Public health initiatives and primary care',
          unitServices: [
            { id: '3', name: 'Public Health Programs', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '4', name: 'Primary Care Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.3',
          name: 'Disaster Risk Reduction Management for Health Incident Commander Post',
          logo: '/icons/placeholder.svg',
          description: 'Emergency response and disaster management',
          unitServices: [
            { id: '5', name: 'Emergency Response', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '6', name: 'Disaster Preparedness', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.4',
          name: 'Hospital Infection Control Unit',
          logo: '/icons/placeholder.svg',
          description: 'Infection prevention and control',
          unitServices: [
            { id: '7', name: 'Infection Monitoring', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '8', name: 'Prevention Protocols', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.5',
          name: 'Legal Unit',
          logo: '/icons/placeholder.svg',
          description: 'Legal services and compliance',
          unitServices: [
            { id: '9', name: 'Legal Consultation', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '10', name: 'Compliance Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.6',
          name: 'Health Facility Development Unit',
          logo: '/icons/placeholder.svg',
          description: 'Facility planning and development',
          unitServices: [
            { id: '11', name: 'Facility Planning', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '12', name: 'Development Projects', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.7',
          name: 'Integrated Hospital Operations & Management Program',
          logo: '/icons/placeholder.svg',
          description: 'Hospital operations integration',
          unitServices: [
            { id: '13', name: 'Operations Management', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '14', name: 'Integration Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '1.8',
          name: 'Quality and Strategy Management',
          logo: '/icons/placeholder.svg',
          description: 'Quality assurance and strategic planning',
          unitServices: [
            { id: '15', name: 'Quality Assurance', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '16', name: 'Strategic Planning', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Medical Service',
      logo: '/icons/placeholder.svg',
      description: 'Core medical care and treatment services',
      departments: [
        {
          id: '2.1',
          name: 'Surgery',
          logo: '/icons/placeholder.svg',
          description: 'Surgical procedures and operations',
          unitServices: [
            { id: '17', name: 'General Surgery', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '18', name: 'Specialized Surgery', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.2',
          name: 'Anesthesia',
          logo: '/icons/placeholder.svg',
          description: 'Anesthesia and pain management',
          unitServices: [
            { id: '19', name: 'Anesthesia Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '20', name: 'Pain Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.3',
          name: 'Orthopedics',
          logo: '/icons/placeholder.svg',
          description: 'Bone and joint care',
          unitServices: [
            { id: '21', name: 'Orthopedic Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '22', name: 'Joint Replacement', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.4',
          name: 'Otorhinolaryngology',
          logo: '/icons/placeholder.svg',
          description: 'Ear, nose, and throat care',
          unitServices: [
            { id: '23', name: 'ENT Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '24', name: 'Hearing Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.5',
          name: 'OB-Gyne',
          logo: '/icons/placeholder.svg',
          description: 'Obstetrics and gynecology',
          unitServices: [
            { id: '25', name: 'Prenatal Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '26', name: 'Gynecological Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.6',
          name: 'Ophthalmology',
          logo: '/icons/placeholder.svg',
          description: 'Eye care and vision services',
          unitServices: [
            { id: '27', name: 'Eye Examinations', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '28', name: 'Vision Correction', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.7',
          name: 'Dental',
          logo: '/icons/placeholder.svg',
          description: 'Dental care and oral health',
          unitServices: [
            { id: '29', name: 'Dental Check-ups', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '30', name: 'Dental Procedures', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.8',
          name: 'Internal Medicine',
          logo: '/icons/placeholder.svg',
          description: 'Internal medicine and adult care',
          unitServices: [
            { id: '31', name: 'Adult Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '32', name: 'Chronic Disease Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.9',
          name: 'Pediatrics',
          logo: '/icons/placeholder.svg',
          description: 'Child and adolescent care',
          unitServices: [
            { id: '33', name: 'Child Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '34', name: 'Vaccination', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.10',
          name: 'Rehabilitation Medicine',
          logo: '/icons/placeholder.svg',
          description: 'Physical therapy and rehabilitation',
          unitServices: [
            { id: '35', name: 'Physical Therapy', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '36', name: 'Rehabilitation Programs', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.11',
          name: 'Emergency Room',
          logo: '/icons/placeholder.svg',
          description: 'Emergency medical services',
          unitServices: [
            { id: '37', name: 'Emergency Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '38', name: 'Trauma Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.12',
          name: 'Outpatient Department',
          logo: '/icons/placeholder.svg',
          description: 'Outpatient care services',
          unitServices: [
            { id: '39', name: 'Outpatient Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '40', name: 'Follow-up Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.13',
          name: 'Community and Family Medicine',
          logo: '/icons/placeholder.svg',
          description: 'Community health and family care',
          unitServices: [
            { id: '41', name: 'Community Health', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '42', name: 'Family Medicine', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.14',
          name: 'Pathology',
          logo: '/icons/placeholder.svg',
          description: 'Laboratory pathology services',
          unitServices: [
            { id: '43', name: 'Pathology Tests', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '44', name: 'Tissue Analysis', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '2.15',
          name: 'Radiology',
          logo: '/icons/placeholder.svg',
          description: 'Medical imaging and radiology',
          unitServices: [
            { id: '45', name: 'X-Ray Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '46', name: 'Advanced Imaging', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Allied Health Professional Service',
      logo: '/icons/placeholder.svg',
      description: 'Supporting healthcare professionals',
      departments: [
        {
          id: '3.1',
          name: 'Medical Social Work',
          logo: '/icons/placeholder.svg',
          description: 'Social work and patient advocacy',
          unitServices: [
            { id: '47', name: 'Social Work Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '48', name: 'Patient Advocacy', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '3.2',
          name: 'Health Information Management',
          logo: '/icons/placeholder.svg',
          description: 'Health records and information',
          unitServices: [
            { id: '49', name: 'Records Management', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '50', name: 'Information Systems', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '3.3',
          name: 'Nutrition & Dietetics',
          logo: '/icons/placeholder.svg',
          description: 'Nutritional care and diet planning',
          unitServices: [
            { id: '51', name: 'Nutritional Assessment', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '52', name: 'Diet Planning', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '3.4',
          name: 'Pharmacy',
          logo: '/icons/placeholder.svg',
          description: 'Pharmaceutical services',
          unitServices: [
            { id: '53', name: 'Medication Dispensing', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '54', name: 'Pharmaceutical Care', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Nursing Service',
      logo: '/icons/placeholder.svg',
      description: 'Patient care and nursing management',
      departments: [
        {
          id: '4.1',
          name: 'Training and Development',
          logo: '/icons/placeholder.svg',
          description: 'Nursing education and training',
          unitServices: [
            { id: '55', name: 'Nursing Education', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '56', name: 'Skills Development', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '4.2',
          name: 'Clinical and Patient Care',
          logo: '/icons/placeholder.svg',
          description: 'Direct patient care services',
          unitServices: [
            { id: '57', name: 'Patient Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '58', name: 'Clinical Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '4.3',
          name: 'Operating Room Complex',
          logo: '/icons/placeholder.svg',
          description: 'Operating room services',
          unitServices: [
            { id: '59', name: 'Surgical Support', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '60', name: 'OR Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '4.4',
          name: 'Infection Control',
          logo: '/icons/placeholder.svg',
          description: 'Nursing infection control',
          unitServices: [
            { id: '61', name: 'Infection Prevention', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '62', name: 'Control Measures', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '5',
      name: 'Hospital Operations & Patient Support Service',
      logo: '/icons/placeholder.svg',
      description: 'Hospital operations and patient assistance',
      departments: [
        {
          id: '5.1',
          name: 'Human Resource Management',
          logo: '/icons/placeholder.svg',
          description: 'HR services and management',
          unitServices: [
            { id: '63', name: 'HR Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '64', name: 'Employee Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.2',
          name: 'Procurement',
          logo: '/icons/placeholder.svg',
          description: 'Procurement and purchasing',
          unitServices: [
            { id: '65', name: 'Purchasing Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '66', name: 'Vendor Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.3',
          name: 'Materials Management',
          logo: '/icons/placeholder.svg',
          description: 'Materials and inventory management',
          unitServices: [
            { id: '67', name: 'Inventory Control', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '68', name: 'Materials Tracking', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.4',
          name: 'Engineering & Facilities Management',
          logo: '/icons/placeholder.svg',
          description: 'Facility maintenance and engineering',
          unitServices: [
            { id: '69', name: 'Facility Maintenance', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '70', name: 'Engineering Services', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.5',
          name: 'Motorpool / Transport Services',
          logo: '/icons/placeholder.svg',
          description: 'Transportation and vehicle services',
          unitServices: [
            { id: '71', name: 'Transport Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '72', name: 'Vehicle Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.6',
          name: 'Laundry & Linen',
          logo: '/icons/placeholder.svg',
          description: 'Laundry and linen services',
          unitServices: [
            { id: '73', name: 'Laundry Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '74', name: 'Linen Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.7',
          name: 'Non Medical Records',
          logo: '/icons/placeholder.svg',
          description: 'Non-medical documentation',
          unitServices: [
            { id: '75', name: 'Document Management', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '76', name: 'Records Archiving', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '5.8',
          name: 'Security Services',
          logo: '/icons/placeholder.svg',
          description: 'Hospital security and safety',
          unitServices: [
            { id: '77', name: 'Security Management', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '78', name: 'Safety Protocols', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '6',
      name: 'Finance Service',
      logo: '/icons/placeholder.svg',
      description: 'Financial management and billing',
      departments: [
        {
          id: '6.1',
          name: 'Budget',
          logo: '/icons/placeholder.svg',
          description: 'Budget planning and management',
          unitServices: [
            { id: '79', name: 'Budget Planning', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '80', name: 'Financial Planning', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '6.2',
          name: 'Accounting',
          logo: '/icons/placeholder.svg',
          description: 'Financial accounting services',
          unitServices: [
            { id: '81', name: 'Financial Reports', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '82', name: 'Account Management', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '6.3',
          name: 'Billing & Claims',
          logo: '/icons/placeholder.svg',
          description: 'Billing and insurance claims',
          unitServices: [
            { id: '83', name: 'Billing Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '84', name: 'Claims Processing', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '6.4',
          name: 'Cash Operations',
          logo: '/icons/placeholder.svg',
          description: 'Cash management and operations',
          unitServices: [
            { id: '85', name: 'Cash Management', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '86', name: 'Financial Operations', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '7',
      name: 'BUCAS',
      logo: '/icons/placeholder.svg',
      description: 'Bagong Urgent Care and Ambulatory Service',
      departments: [
        {
          id: '7.1',
          name: 'Urgent Care Services',
          logo: '/icons/placeholder.svg',
          description: 'Emergency and urgent care',
          unitServices: [
            { id: '87', name: 'Emergency Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '88', name: 'Urgent Treatment', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '7.2',
          name: 'Ambulatory Services',
          logo: '/icons/placeholder.svg',
          description: 'Outpatient and ambulatory care',
          unitServices: [
            { id: '89', name: 'Outpatient Care', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '90', name: 'Ambulatory Procedures', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '8',
      name: 'ITRMCEA',
      logo: '/icons/placeholder.svg',
      description: 'ITRMC Employees Association',
      departments: [
        {
          id: '8.1',
          name: 'Employee Services',
          logo: '/icons/placeholder.svg',
          description: 'Employee association services',
          unitServices: [
            { id: '91', name: 'Member Services', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '92', name: 'Employee Benefits', logo: '/icons/placeholder.svg', status: 'active' }
          ]
        },
        {
          id: '8.2',
          name: 'Association Activities',
          logo: '/icons/placeholder.svg',
          description: 'Association programs and activities',
          unitServices: [
            { id: '93', name: 'Program Management', logo: '/icons/placeholder.svg', status: 'active' },
            { id: '94', name: 'Activity Coordination', logo: '/icons/placeholder.svg', status: 'active' }
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
    // Navigate to Services Module
    window.location.href = '/services'
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
    // In real app, navigate to Analytics Module
    alert('Navigating to Analytics Module...')
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
      <main className="px-4 py-6 pb-24 space-y-8">
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
