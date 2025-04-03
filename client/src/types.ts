export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Reminder {
  id: string;
  medicationName: string;
  time: string;
  isActive: boolean;
}

export interface Symptom {
  id: string;
  
  name: string;
  severity: number;
  date: string;
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
  rating: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}