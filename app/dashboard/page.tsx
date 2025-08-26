'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KaSillagLogo } from '@/components/ka-sillag-logo';
import { 
  Users, 
  Calendar, 
  Clock, 
  Activity, 
  Bell, 
  Settings, 
  LogOut,
  Plus,
  ArrowRight,
  User,
  FileText,
  BarChart3
} from 'lucide-react';
import { dummyUsers, dummyAppointments, dummyQueueItems, dummyNotifications } from '@/data/dummy-data';

export default function DashboardPage() {
  const [currentUser] = useState(dummyUsers[0]); // Simulate logged in user
  const [notifications] = useState(dummyNotifications);

  const stats = [
    {
      title: 'Total Patients Today',
      value: '47',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Appointments',
      value: '12',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'In Queue',
      value: '8',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Completed',
      value: '39',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const quickActions = [
    {
      title: 'OPD Queue',
      description: 'Manage patient queues',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/queue'
    },
    {
      title: 'Appointments',
      description: 'Schedule & manage appointments',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '/appointments'
    },
    {
      title: 'Patient Records',
      description: 'View patient information',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/patients'
    },
    {
      title: 'Reports',
      description: 'Generate reports & analytics',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '/reports'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <KaSillagLogo size="sm" />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </Button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.department}</p>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening at ITRMC today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${action.bgColor}`}>
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>Recent Appointments</span>
              </CardTitle>
              <CardDescription>
                Upcoming appointments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">{appointment.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-xs text-gray-500">{appointment.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Appointments
              </Button>
            </CardContent>
          </Card>

          {/* Current Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock size={20} />
                <span>Current Queue</span>
              </CardTitle>
              <CardDescription>
                Patients waiting for consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyQueueItems.filter(item => item.status === 'waiting').slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.patientName}</p>
                      <p className="text-sm text-gray-500">{item.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">#{item.queueNumber}</p>
                      <p className="text-xs text-gray-500">{item.estimatedWaitTime} min wait</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Queue
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
