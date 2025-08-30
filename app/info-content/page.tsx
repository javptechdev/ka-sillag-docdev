'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Info, Target, Eye, Users, BarChart3, FileText } from 'lucide-react'
import { HorizontalNavigationBar } from '@/components/home/HorizontalNavigationBar'

// Info content interface
interface InfoContent {
  id: string
  title: string
  division: string
  content: string
  lastUpdated: string
}

export default function InfoContentPage() {
  // Get URL parameters
  const [divisionName, setDivisionName] = useState<string>('')
  const [infoType, setInfoType] = useState<string>('')
  const [infoTitle, setInfoTitle] = useState<string>('')
  
  // Mock content data (in real app, this comes from API)
  const [contentData] = useState<InfoContent>({
    id: 'about',
    title: 'About',
    division: 'Medical Division',
    content: `The Medical Division is the cornerstone of our healthcare institution, dedicated to providing exceptional patient care through innovative medical practices and compassionate service.

Our division encompasses a comprehensive range of medical specialties, from primary care to advanced treatments, ensuring that every patient receives personalized and evidence-based care. We are committed to maintaining the highest standards of medical excellence while fostering a culture of continuous learning and improvement.

Key Areas of Focus:
• Primary and Specialty Care Services
• Emergency Medicine and Critical Care
• Diagnostic and Therapeutic Procedures
• Patient Education and Preventive Care
• Research and Clinical Trials
• Quality Assurance and Patient Safety

Our team of highly skilled healthcare professionals works collaboratively to deliver integrated care that addresses the physical, emotional, and social needs of our patients. We believe in treating not just the illness, but the whole person, with dignity, respect, and compassion.

Through our commitment to excellence, innovation, and patient-centered care, we strive to be the leading medical division in the region, setting standards for quality healthcare delivery.`,
    lastUpdated: 'January 2024'
  })

  // Get URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const division = urlParams.get('division') || 'Medical Division'
    const infoType = urlParams.get('infoType') || 'about'
    const infoTitle = urlParams.get('infoTitle') || 'About'
    
    setDivisionName(division)
    setInfoType(infoType)
    setInfoTitle(infoTitle)
  }, [])

  const handleBackClick = () => {
    window.history.back()
  }



  // Get icon based on info type
  const getInfoIcon = (type: string) => {
    switch (type) {
      case 'about':
        return <Info size={24} className="text-primary" />
      case 'vision':
        return <Eye size={24} className="text-primary" />
      case 'mission':
        return <Target size={24} className="text-primary" />
      case 'strategic-objectives':
        return <BarChart3 size={24} className="text-primary" />
      case 'organizational-chart':
        return <Users size={24} className="text-primary" />
      case 'policies':
        return <FileText size={24} className="text-primary" />
      default:
        return <Info size={24} className="text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header for Info Content */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-gray-900 truncate">
              {infoTitle}
            </h1>
            <p className="text-sm text-gray-600 truncate">
              {divisionName}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Content Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {getInfoIcon(infoType)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{infoTitle}</h2>
          <p className="text-gray-600 mb-1">{divisionName}</p>
          <p className="text-xs text-gray-500">Last updated: {contentData.lastUpdated}</p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {contentData.content}
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Need More Information?</h3>
          <p className="text-sm text-blue-700 mb-3">
            Contact the {divisionName} office for additional details or clarification.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Contact Division Office
          </button>
        </div>
      </main>

      {/* Horizontal Navigation Bar */}
      <HorizontalNavigationBar 
        currentModule="home"
      />
    </div>
  )
}
