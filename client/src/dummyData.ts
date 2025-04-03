import { Medication, Reminder, Symptom, Doctor, ChatMessage, EmergencyContact, Appointment } from './types';

export const medications: Medication[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice Daily',
    duration: '7 days'
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'As needed',
    duration: '5 days'
  }
];

export const reminders: Reminder[] = [
  {
    id: '1',
    medicationName: 'Amoxicillin',
    time: '08:00',
    isActive: true
  },
  {
    id: '2',
    medicationName: 'Amoxicillin',
    time: '20:00',
    isActive: true
  }
];

export const symptoms: Symptom[] = [
  {
    id: '1',
    name: 'Fever',
    severity: 3,
    date: '2024-03-15',
    notes: 'Started in the evening'
  },
  {
    id: '2',
    name: 'Cough',
    severity: 2,
    date: '2024-03-15',
    notes: 'Dry cough'
  }
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    availability: ['Monday', 'Wednesday', 'Friday'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    availability: ['Tuesday', 'Thursday'],
    rating: 4.9
  }
];

export const chatHistory: ChatMessage[] = [
  {
    id: '1',
    text: 'Hello! How can I help you today?',
    isUser: false,
    timestamp: '2024-03-15T10:00:00'
  },
  {
    id: '2',
    text: 'Can I take Amoxicillin with food?',
    isUser: true,
    timestamp: '2024-03-15T10:01:00'
  },
  {
    id: '3',
    text: 'Yes, Amoxicillin can be taken with or without food. However, taking it with food can help reduce stomach upset.',
    isUser: false,
    timestamp: '2024-03-15T10:01:30'
  }
];

export const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'John Doe',
    relationship: 'Family Member',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Jane Smith',
    relationship: 'Primary Doctor',
    phone: '+1987654321'
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Smith',
    time: '09:00 AM',
    type: 'General Checkup',
    status: 'Confirmed'
  },
  {
    id: '2',
    patientName: 'Emily Johnson',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'Pending'
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    time: '02:00 PM',
    type: 'Video Consultation',
    status: 'Confirmed'
  },
  {
    id: '4',
    patientName: 'Sarah Wilson',
    time: '03:30 PM',
    type: 'New Patient',
    status: 'Confirmed'
  }
];