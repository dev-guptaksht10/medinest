import React, { useState } from 'react';
import { Bell, Plus, X } from 'lucide-react';
import { reminders } from '../dummyData';
import toast from 'react-hot-toast';

interface ReminderType {
  id: string;
  medicationName: string;
  time: string;
  isActive: boolean;
}

export function Reminders() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [localReminders, setLocalReminders] = useState(reminders);
  const [newReminder, setNewReminder] = useState({
    medicationName: '',
    time: ''
  });

  const handleDelete = (id: string) => {
    setLocalReminders(prev => prev.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };

  const handleToggle = (id: string) => {
    setLocalReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
    toast.success('Reminder updated');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReminder.medicationName || !newReminder.time) {
      toast.error('Please fill in all fields');
      return;
    }

    const reminder: ReminderType = {
      id: Date.now().toString(),
      medicationName: newReminder.medicationName,
      time: newReminder.time,
      isActive: true
    };

    setLocalReminders(prev => [...prev, reminder]);
    setNewReminder({ medicationName: '', time: '' });
    setShowAddModal(false);
    toast.success('Reminder added successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Medication Reminders</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Reminder
        </button>
      </div>

      <div className="grid gap-4">
        {localReminders.map(reminder => (
          <div key={reminder.id} className="bg-gray-800 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-lg">{reminder.medicationName}</h3>
                <p className="text-gray-400">Time: {reminder.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminder.isActive}
                  onChange={() => handleToggle(reminder.id)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                />
                <span>Active</span>
              </label>
              <button
                onClick={() => handleDelete(reminder.id)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Reminder</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Medication Name</label>
                <input
                  type="text"
                  value={newReminder.medicationName}
                  onChange={(e) => setNewReminder({ ...newReminder, medicationName: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}