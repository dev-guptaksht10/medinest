import React from 'react';
import { doctors } from '../dummyData';
import { Calendar, Star, Video } from 'lucide-react';
import toast from 'react-hot-toast';

export function Consultations() {
  const handleBooking = () => {
    toast.success('Consultation booked successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Doctor Consultations</h1>
      
      <div className="grid gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {doctor.name.split(' ')[1][0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-gray-400">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      Available: {doctor.availability.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleBooking}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                >
                  <Calendar className="w-4 h-4" />
                  Book Visit
                </button>
                <button
                  onClick={handleBooking}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}