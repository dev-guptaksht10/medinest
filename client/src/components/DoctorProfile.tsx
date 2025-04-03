import React, { useState } from 'react';
import { User, Mail, Phone, Building, Award, Star, Clock, Calendar, Edit2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medinest.com',
    phone: '+1 234 567 8900',
    specialization: 'Cardiology',
    hospital: 'MediNest General Hospital',
    experience: '15 years',
    rating: 4.8,
    consultationHours: '9:00 AM - 5:00 PM',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    education: [
      {
        degree: 'MD in Medicine',
        institution: 'Harvard Medical School',
        year: '2008'
      },
      {
        degree: 'Cardiology Specialization',
        institution: 'Johns Hopkins Hospital',
        year: '2012'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Doctor Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-purple-500">{profile.specialization}</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>{profile.rating} Rating</span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Hospital</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.hospital}
                    onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                    className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  />
                ) : (
                  <p>{profile.hospital}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
              <Award className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Experience</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  />
                ) : (
                  <p>{profile.experience}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Consultation Hours</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.consultationHours}
                    onChange={(e) => setProfile({ ...profile, consultationHours: e.target.value })}
                    className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  />
                ) : (
                  <p>{profile.consultationHours}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-400">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Days</h3>
          <div className="flex flex-wrap gap-2">
            {profile.availableDays.map((day, index) => (
              <div key={index} className="bg-purple-600/20 text-purple-500 px-4 py-2 rounded-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}