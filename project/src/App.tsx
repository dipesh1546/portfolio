import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { RecordList } from './components/RecordList';
import { AddRecordModal } from './components/AddRecordModal';
import { UserRole, MedicalRecord } from './types';
import { FileText, Users, Shield } from 'lucide-react';
import { mockRecords } from './data/mockData';

function App() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  const handleToggleAccess = (recordId: string) => {
    setRecords(records.map(record =>
      record.id === recordId
        ? { ...record, insuranceAccess: !record.insuranceAccess }
        : record
    ));
  };

  const handleDeleteRecord = (recordId: string) => {
    setRecords(records.filter(record => record.id !== recordId));
  };

  const handleAddRecord = (newRecord: Omit<MedicalRecord, 'id' | 'timestamp'>) => {
    const record: MedicalRecord = {
      ...newRecord,
      id: (records.length + 1).toString(),
      timestamp: Date.now(),
    };
    setRecords([...records, record]);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              HealthChain
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Secure, Decentralized Healthcare Records
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleLogin('patient')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FileText className="w-5 h-5 mr-2" />
              Login as Patient
            </button>
            <button
              onClick={() => handleLogin('doctor')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Users className="w-5 h-5 mr-2" />
              Login as Doctor
            </button>
            <button
              onClick={() => handleLogin('insurance')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Shield className="w-5 h-5 mr-2" />
              Login as Insurance Provider
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredRecords = role === 'insurance'
    ? records.filter(record => record.insuranceAccess)
    : records;

  return (
    <Layout role={role} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {role === 'patient' && 'Patient Dashboard'}
            {role === 'doctor' && 'Doctor Dashboard'}
            {role === 'insurance' && 'Insurance Dashboard'}
          </h1>
          <p className="text-gray-600 mb-6">
            {role === 'patient' && 'Manage your medical records and control access permissions.'}
            {role === 'doctor' && 'View and manage patient records you have access to.'}
            {role === 'insurance' && 'Access approved medical records for claim processing.'}
          </p>
          <RecordList
            records={filteredRecords}
            userRole={role}
            onToggleAccess={role === 'patient' ? handleToggleAccess : undefined}
            onDelete={role === 'patient' ? handleDeleteRecord : undefined}
            onAdd={role === 'patient' ? () => setShowAddModal(true) : undefined}
          />
        </div>
      </div>
      {showAddModal && (
        <AddRecordModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddRecord}
        />
      )}
    </Layout>
  );
}

export default App;