export interface User {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  lastLogin: Date;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface QueueItem {
  id: string;
  patientName: string;
  patientId: string;
  department: string;
  queueNumber: number;
  status: 'waiting' | 'in-progress' | 'completed';
  estimatedWaitTime: number;
  createdAt: Date;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}

export interface LoginCredentials {
  employeeId: string;
  pinCode: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  addedBy: string;
  addedByDepartment: string;
  addedTimestamp: Date;
  editedBy?: string;
  editedByDepartment?: string;
  editedTimestamp?: Date;
  commentCount: number;
  loveCount: number;
  isLovedByUser?: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}
