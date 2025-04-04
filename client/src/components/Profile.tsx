import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Home, Camera, LogOut, Calendar, Weight, Ruler, Droplet } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define proper types based on API response
interface ProfileResponse {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    appointments: any[];
    token: string;
  };
  age: number;
  allergies: string[];
  bloodGroup: string;
  chronicDiseases: string[];
  currentMedications: string[];
  height: number;
  weight: number;
  lastUpdated: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: 0,
    bloodGroup: '',
    height: 0,
    weight: 0,
    allergies: [] as string[],
    chronicDiseases: [] as string[],
    currentMedications: [] as string[],
    lastUpdated: '',
  });

  // Function to get token from cookies
  const getCookie = (name: string) => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const token = getCookie('token');
        if (!token) {
          toast.error("Authentication required. Redirecting to login...");
          document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4444/api/users/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({})
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }
        
        console.log("Profile data received:", data); // Debug log
        
        // Extract data from the nested structure
        if (data && data.userId) {
          setProfile({
            name: data.userId.name || '',
            email: data.userId.email || '',
            phone: data.userId.phone || '',
            gender: data.userId.gender || '',
            age: data.age || data.userId.age || 0,
            bloodGroup: data.bloodGroup || '',
            height: data.height || 0,
            weight: data.weight || 0,
            allergies: data.allergies || [],
            chronicDiseases: data.chronicDiseases || [],
            currentMedications: data.currentMedications || [],
            lastUpdated: data.lastUpdated || '',
          });
        } else {
          toast.error("Invalid profile data format received");
        }
        
      } catch (error: any) {
        console.error("Profile fetch error:", error);
        toast.error(error.message);
        
        if (error.message.includes('Authentication')) {
          document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleSave = async () => {
    try {
      const token = getCookie('token');
      if (!token) {
        toast.error("Authentication required.");
        navigate('/login');
        return;
      }

      setIsLoading(true);
      // Prepare the data in the format expected by the backend
      const updateData = {
        name: profile.name,
        // email is not included as it's not editable
        phone: profile.phone,
        gender: profile.gender,
        age: profile.age,
        bloodGroup: profile.bloodGroup,
        height: profile.height,
        weight: profile.weight,
        // Other medical fields as needed
      };

      const response = await fetch('http://localhost:4444/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update profile');

      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6 text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-6">Profile Settings</h1>
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  // Determine which fields to show in each section
  const personalFields = [
    { label: 'Full Name', value: 'name', icon: User, editable: true },
    { label: 'Email', value: 'email', icon: Mail, editable: false },
    { label: 'Phone', value: 'phone', icon: Phone, editable: true },
    { label: 'Age', value: 'age', icon: Calendar, editable: true },
    { label: 'Gender', value: 'gender', icon: User, editable: true },
  ];

  const medicalFields = [
    { label: 'Blood Group', value: 'bloodGroup', icon: Droplet, editable: true },
    { label: 'Height (cm)', value: 'height', icon: Ruler, editable: true },
    { label: 'Weight (kg)', value: 'weight', icon: Weight, editable: true },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Profile Settings</h1>

      <div className="bg-gray-800 rounded-lg p-4 md:p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src='https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid'
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <button 
              className="absolute bottom-0 right-0 bg-purple-600 p-1.5 md:p-2 rounded-full hover:bg-purple-700"
              onClick={() => toast.info("Avatar upload feature coming soon")}
            >
              <Camera className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <h2 className="text-lg md:text-xl font-semibold mt-3 md:mt-4">{profile.name || 'User'}</h2>
          <p className="text-gray-400">{profile.gender || 'Patient'}</p>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {formatDate(profile.lastUpdated)}
          </p>
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-base md:text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {personalFields.map(({ label, value, icon: Icon, editable }) => (
              <div key={value} className="flex items-center gap-3 p-3 md:p-4 bg-gray-700 rounded-lg">
                <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-gray-400">{label}</p>
                  {isEditing && editable ? (
                    <input
                      type={value === 'email' ? 'email' : value === 'age' ? 'number' : 'text'}
                      value={profile[value as keyof typeof profile] || ''}
                      onChange={(e) => {
                        const newValue = value === 'age' ? parseInt(e.target.value) : e.target.value;
                        setProfile({ ...profile, [value]: newValue });
                      }}
                      className="bg-gray-600 rounded px-2 py-1 mt-1 w-full text-white text-sm"
                      disabled={!editable}
                    />
                  ) : (
                    <p className="truncate">{profile[value as keyof typeof profile] || 'Not set'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Information */}
        <div className="mb-6">
          <h3 className="text-base md:text-lg font-semibold mb-3">Medical Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {medicalFields.map(({ label, value, icon: Icon, editable }) => (
              <div key={value} className="flex items-center gap-3 p-3 md:p-4 bg-gray-700 rounded-lg">
                <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-gray-400">{label}</p>
                  {isEditing && editable ? (
                    <input
                      type={value === 'bloodGroup' ? 'text' : 'number'}
                      value={profile[value as keyof typeof profile] || ''}
                      onChange={(e) => {
                        const newValue = value === 'bloodGroup' 
                          ? e.target.value 
                          : parseInt(e.target.value);
                        setProfile({ ...profile, [value]: newValue });
                      }}
                      className="bg-gray-600 rounded px-2 py-1 mt-1 w-full text-white text-sm"
                    />
                  ) : (
                    <p className="truncate">{profile[value as keyof typeof profile] || 'Not set'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="space-y-3 md:space-y-4 mb-6">
          <h3 className="text-base md:text-lg font-semibold">Medical History</h3>
          
          <div className="p-3 md:p-4 bg-gray-700 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400 mb-2">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {profile.allergies.length > 0 ? (
                profile.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-900 rounded-full text-xs md:text-sm">
                    {allergy}
                  </span>
                ))
              ) : (
                <p className="text-sm">No known allergies</p>
              )}
            </div>
          </div>
          
          <div className="p-3 md:p-4 bg-gray-700 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400 mb-2">Chronic Diseases</p>
            <div className="flex flex-wrap gap-2">
              {profile.chronicDiseases.length > 0 ? (
                profile.chronicDiseases.map((disease, index) => (
                  <span key={index} className="px-2 py-1 bg-yellow-900 rounded-full text-xs md:text-sm">
                    {disease}
                  </span>
                ))
              ) : (
                <p className="text-sm">No chronic diseases</p>
              )}
            </div>
          </div>
          
          <div className="p-3 md:p-4 bg-gray-700 rounded-lg">
            <p className="text-xs md:text-sm text-gray-400 mb-2">Current Medications</p>
            <div className="flex flex-wrap gap-2">
              {profile.currentMedications.length > 0 ? (
                profile.currentMedications.map((medication, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-900 rounded-full text-xs md:text-sm">
                    {medication}
                  </span>
                ))
              ) : (
                <p className="text-sm">No current medications</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg w-full md:w-auto"
            disabled={isLoading}
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            Logout
          </button>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg w-full md:w-auto"
              disabled={isLoading}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}