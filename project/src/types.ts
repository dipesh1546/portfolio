export type UserRole = 'patient' | 'doctor' | 'insurance';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  walletAddress?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  description: string;
  date: string;
  doctorId: string;
  type: 'consultation' | 'prescription' | 'lab_result' | 'imaging';
  accessList: string[]; // List of authorized doctor IDs
  insuranceAccess: boolean;
  timestamp: number;
}