import React from 'react';
import { UserRole } from '../types';
import { FileText, Users, Shield, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
}

export function Layout({ children, role, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {role === 'patient' && <FileText className="w-8 h-8" />}
              {role === 'doctor' && <Users className="w-8 h-8" />}
              {role === 'insurance' && <Shield className="w-8 h-8" />}
              <span className="ml-2 text-xl font-semibold">
                HealthChain
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 hover:bg-indigo-700 px-3 py-2 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}