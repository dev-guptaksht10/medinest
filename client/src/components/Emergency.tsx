import React from 'react';
import { Phone, AlertTriangle, Bell } from 'lucide-react';
import { emergencyContacts } from '../dummyData';
import toast from 'react-hot-toast';

export function Emergency() {
  const handleEmergencyAlert = () => {
    toast.success('Emergency alert sent to all contacts');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <h1 className="text-2xl font-bold">Emergency Contacts</h1>
      </div>

      <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-6 mb-8">
        <button
          onClick={handleEmergencyAlert}
          className="w-full bg-red-600 hover:bg-red-700 rounded-lg py-4 flex items-center justify-center gap-3"
        >
          <Bell className="w-6 h-6" />
          <span className="text-lg font-semibold">Send Emergency Alert</span>
        </button>
        <p className="text-sm text-gray-300 mt-4 text-center">
          This will notify all your emergency contacts immediately
        </p>
      </div>

      <div className="grid gap-4">
        {emergencyContacts.map(contact => (
          <div key={contact.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{contact.name}</h3>
                <p className="text-gray-400">{contact.relationship}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{contact.phone}</span>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Calling ${contact.name}...`)}
                className="bg-green-600 hover:bg-green-700 rounded-full p-3"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}