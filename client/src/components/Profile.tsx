import React, { useState } from 'react';
import { User, Mail, Phone, Home, Camera, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Health Street, Medical City, MC 12345',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full hover:bg-purple-700">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-xl font-semibold mt-4">{profile.name}</h2>
          <p className="text-gray-400">Patient</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
            <User className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
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

          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
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

          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
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

          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
            <Home className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Address</p>
              {isEditing ? (
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="bg-gray-600 rounded px-2 py-1 mt-1 w-full"
                  rows={2}
                />
              ) : (
                <p>{profile.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}