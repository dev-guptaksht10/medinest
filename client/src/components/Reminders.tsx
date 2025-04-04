import React, { useState, useEffect } from "react";
import { Bell, Plus, X, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";

interface ReminderType {
  _id: string;
  medication: string;
  type: "Medication" | "Appointment" | "General";
  time: string;
  date: string;
  repeat: "Daily" | "Weekly" | "Monthly" | "None";
  status: boolean;
}

export function Reminders() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [newReminder, setNewReminder] = useState({
    medication: "",
    type: "Medication",
    time: "",
    date: "",
    repeat: "None",
    status: true,
  });

  const getCookie = (name: string) => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  };

  const token = getCookie('token');
  
  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/users/alarms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reminders");
      }

      setReminders(data.reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      toast.error("No reminders, please add some reminders");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.medication || !newReminder.time || !newReminder.type || !newReminder.date) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Using the API structure from your backend
      const response = await fetch('http://localhost:4444/api/users/alarms/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newReminder )  // Wrap in newReminder based on your backend
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to add reminder");
      }
      
      // Refresh reminders from server to ensure we have latest data
      await fetchReminders();
      setShowAddModal(false);
      setNewReminder({ medication: "", type: "Medication", time: "", date: "", repeat: "None", status: true });
      toast.success("Reminder added successfully");
    } catch (error) {
      console.error("Error adding reminder:", error);
      toast.error("Failed to add reminder");
    }
  };

  const handleToggleStatus = async (reminder: ReminderType) => {
    try {
      const response = await fetch('http://localhost:4444/api/users/alarms/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reminderId: reminder._id,
          status: !reminder.status
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to update reminder status");
      }
      
      // Update the reminder in local state
      setReminders(reminders.map(r => 
        r._id === reminder._id ? { ...r, status: !r.status } : r
      ));
      
      toast.success("Reminder status updated");
    } catch (error) {
      console.error("Error updating reminder status:", error);
      toast.error("Failed to update reminder status");
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      // Using the API structure from your backend
      const response = await fetch('http://localhost:4444/api/users/alarms/delete', {
        method: 'POST',  // Changed to POST based on your backend
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reminderId: id })  // Pass reminderId in the body
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete reminder");
      }
      
      // Remove from state after successful deletion
      setReminders(reminders.filter(r => r._id !== id));
      toast.success("Reminder deleted successfully");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Failed to delete reminder");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
          <Plus className="w-5 h-5" /> Add Reminder
        </button>
      </div>

      <div className="grid gap-4">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div key={reminder._id} className="bg-gray-800 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="w-6 h-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-lg">{reminder.medication}</h3>
                  <p className="text-gray-400">Type: {reminder.type}</p>
                  <p className="text-gray-400">Time: {reminder.time}</p>
                  <p className="text-gray-400">Date: {reminder.date}</p>
                  <p className="text-gray-400">Repeat: {reminder.repeat}</p>
                  <p className="text-gray-400">
                    Status: {reminder.status ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleToggleStatus(reminder)} 
                  className={`${reminder.status ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-gray-300'}`}
                  title={reminder.status ? 'Deactivate reminder' : 'Activate reminder'}
                >
                  {reminder.status ? 
                    <ToggleRight className="w-6 h-6" /> : 
                    <ToggleLeft className="w-6 h-6" />
                  }
                </button>
                <button 
                  onClick={() => handleDeleteReminder(reminder._id)} 
                  className="text-red-400 hover:text-red-300"
                  title="Delete reminder"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No reminders found. Add your first reminder!
          </div>
        )}
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
                  value={newReminder.medication}
                  onChange={(e) => setNewReminder({ ...newReminder, medication: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newReminder.type as string}
                  onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as any })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Medication">Medication</option>
                  <option value="Appointment">Appointment</option>
                  <option value="General">General</option>
                </select>
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
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Repeat</label>
                <select
                  value={newReminder.repeat as string}
                  onChange={(e) => setNewReminder({ ...newReminder, repeat: e.target.value as any })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="None">None</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
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