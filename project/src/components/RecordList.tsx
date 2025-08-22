import React from 'react';
import { MedicalRecord, UserRole } from '../types';
import { FileText, Lock, Unlock, Trash, PlusCircle } from 'lucide-react';

interface RecordListProps {
  records: MedicalRecord[];
  userRole: UserRole;
  onToggleAccess?: (recordId: string) => void;
  onDelete?: (recordId: string) => void;
  onAdd?: () => void;
}

export function RecordList({ records, userRole, onToggleAccess, onDelete, onAdd }: RecordListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>
        {userRole === 'patient' && (
          <button
            onClick={onAdd}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Record
          </button>
        )}
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{record.title}</h3>
                    <p className="text-sm text-gray-500">{record.description}</p>
                    <p className="text-xs text-gray-400">Date: {record.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {userRole === 'patient' && (
                    <>
                      <button
                        onClick={() => onToggleAccess?.(record.id)}
                        className="p-2 text-gray-400 hover:text-indigo-600"
                        title="Toggle Insurance Access"
                      >
                        {record.insuranceAccess ? (
                          <Unlock className="w-5 h-5" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => onDelete?.(record.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                        title="Delete Record"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}