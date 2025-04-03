import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Award, Save, LogOut, Edit2, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('Unauthorized: No token found');
        return;
      }
      try {
        const response = await fetch('http://localhost:4444/api/doctors/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        // Ensure specialization and hospital are always arrays
        data.specialization = Array.isArray(data.specialization) ? data.specialization : [data.specialization];
        data.hospital = Array.isArray(data.hospital) ? data.hospital : [];

        setProfile(data);
        setEditedProfile(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('Unauthorized: No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:4444/api/doctors/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editedProfile.name,
          specialization: editedProfile.specialization, // Keep as array
          phone: editedProfile.phone,
          address: editedProfile.address,
          experience: editedProfile.experience,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Ensure specialization is an array after update
      data.specialization = Array.isArray(data.specialization) ? data.specialization : [data.specialization];

      setProfile(data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('doctor');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!profile) {
    return <div className="text-center text-gray-300">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Doctor Profile</h1>
        <div className="flex gap-4">
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            {isEditing ? <><Save className="w-5 h-5" /> Save Changes</> : <><Edit2 className="w-5 h-5" /> Edit Profile</>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-purple-500">{profile.specialization?.join(', ') || 'No Specialization'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent border-b border-gray-600 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <input
              type="text"
              value={profile.email}
              disabled
              className="bg-transparent border-b border-gray-600 w-full text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <input
              type="text"
              name="phone"
              value={editedProfile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent border-b border-gray-600 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            <input
              type="text"
              name="address"
              value={editedProfile.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent border-b border-gray-600 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <input
              type="number"
              name="experience"
              value={editedProfile.experience}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent border-b border-gray-600 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Hospital Details */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Stethoscope className="w-5 h-5" /> Hospital Details
          </h3>
          {profile.hospital?.length > 0 ? (
            profile.hospital.map((hosp) => (
              <div key={hosp._id} className="mt-2">
                <p><strong>Name:</strong> {hosp.name}</p>
                <p><strong>Address:</strong> {hosp.address}</p>
                <p><strong>Specialty:</strong> {hosp.specialty}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No hospital information available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
