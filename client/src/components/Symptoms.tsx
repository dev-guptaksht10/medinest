import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';
import { symptoms } from '../dummyData';
import toast from 'react-hot-toast';

interface SymptomType {
  id: string;
  name: string;
  severity: number;
  date: string;
  notes: string;
}

export function Symptoms() {
  const [localSymptoms, setLocalSymptoms] = useState(symptoms);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: 3,
    notes: ''
  });

  const handleDelete = (id: string) => {
    setLocalSymptoms(prev => prev.filter(symptom => symptom.id !== id));
    toast.success('Symptom deleted');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSymptom.name) {
      toast.error('Please enter a symptom name');
      return;
    }

    const symptom: SymptomType = {
      id: Date.now().toString(),
      name: newSymptom.name,
      severity: newSymptom.severity,
      date: new Date().toISOString().split('T')[0],
      notes: newSymptom.notes
    };

    setLocalSymptoms(prev => [...prev, symptom]);
    setNewSymptom({ name: '', severity: 3, notes: '' });
    setShowAddModal(false);
    toast.success('Symptom added successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Symptom Tracker</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Log Symptom
        </button>
      </div>

      <div className="grid gap-4">
        {localSymptoms.map(symptom => (
          <div key={symptom.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-pink-400" />
                <div>
                  <h3 className="font-semibold text-lg">{symptom.name}</h3>
                  <p className="text-gray-400">Date: {symptom.date}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Severity: </span>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-2 rounded ${
                            level <= symptom.severity ? 'bg-pink-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-300">{symptom.notes}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(symptom.id)}
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
            <h2 className="text-xl font-bold mb-4">Log New Symptom</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Symptom Name</label>
                <input
                  type="text"
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter symptom name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Severity (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newSymptom.severity}
                  onChange={(e) => setNewSymptom({ ...newSymptom, severity: parseInt(e.target.value) })}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Mild</span>
                  <span>Severe</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={newSymptom.notes}
                  onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Add any additional notes"
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
                  Add Symptom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}