import { MedicalRecord, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'patient',
    walletAddress: '0x1234...5678',
  },
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
    walletAddress: '0x8765...4321',
  },
  {
    id: '3',
    name: 'HealthGuard Insurance',
    role: 'insurance',
    walletAddress: '0x9876...1234',
  },
];

export const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    title: 'Annual Checkup',
    description: 'Regular health examination with blood work',
    date: '2024-03-15',
    doctorId: '2',
    type: 'consultation',
    accessList: ['2'],
    insuranceAccess: true,
    timestamp: Date.now(),
  },
  {
    id: '2',
    patientId: '1',
    title: 'Prescription - Antibiotics',
    description: 'Amoxicillin 500mg, 3x daily for 7 days',
    date: '2024-03-16',
    doctorId: '2',
    type: 'prescription',
    accessList: ['2'],
    insuranceAccess: true,
    timestamp: Date.now(),
  },
];