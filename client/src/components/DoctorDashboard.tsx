import React from 'react';
import { Calendar, Users, Star, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { appointments } from '../dummyData';

export function DoctorDashboard() {
  const stats = [
    {
      title: "Today's Appointments",
      value: "8",
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      change: "+2 from yesterday"
    },
    {
      title: "Total Patients",
      value: "1,248",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      change: "+12 this week"
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      change: "+0.2 this month"
    },
    {
      title: "Consultation Hours",
      value: "128",
      icon: <Clock className="w-6 h-6 text-green-500" />,
      change: "This month"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Doctor Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                {stat.icon}
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Today's Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {appointment.patientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-400">{appointment.time}</p>
                  <p className="text-sm text-gray-400">{appointment.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'Confirmed' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {appointment.status}
                </span>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}