import React from 'react';
import { medications, reminders, symptoms } from '../dummyData';
import { Bell, Pill, FileText } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Active Medications */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Pill className="w-5 h-5 text-purple-400 mr-2" />
            <h2 className="text-xl font-semibold">Active Medications</h2>
          </div>
          <div className="space-y-4">
            {medications.map(med => (
              <div key={med.id} className="bg-gray-700 rounded p-4">
                <h3 className="font-semibold">{med.name}</h3>
                <p className="text-sm text-gray-300">{med.dosage} - {med.frequency}</p>
                <p className="text-sm text-gray-400">Duration: {med.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-yellow-400 mr-2" />
            <h2 className="text-xl font-semibold">Upcoming Reminders</h2>
          </div>
          <div className="space-y-4">
            {reminders.map(reminder => (
              <div key={reminder.id} className="bg-gray-700 rounded p-4">
                <h3 className="font-semibold">{reminder.medicationName}</h3>
                <p className="text-sm text-gray-300">Time: {reminder.time}</p>
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reminder.isActive}
                      onChange={() => {}}
                      className="rounded bg-gray-600 border-gray-500 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">Active</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Symptoms */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-5 h-5 text-pink-400 mr-2" />
            <h2 className="text-xl font-semibold">Recent Symptoms</h2>
          </div>
          <div className="space-y-4">
            {symptoms.map(symptom => (
              <div key={symptom.id} className="bg-gray-700 rounded p-4">
                <h3 className="font-semibold">{symptom.name}</h3>
                <p className="text-sm text-gray-300">Severity: {symptom.severity}/5</p>
                <p className="text-sm text-gray-400">{symptom.date}</p>
                <p className="text-sm text-gray-300 mt-2">{symptom.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}