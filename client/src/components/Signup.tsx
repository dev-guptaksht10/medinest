import React, { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'; 
 
export function Signup() { 
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    phone: '', 
    age: '', 
    gender: '', 
  }); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => { 
    e.preventDefault(); 
   
    if (formData.password !== formData.confirmPassword) { 
      toast.error('Passwords do not match'); 
      return; 
    } 
   
    setLoading(true); 
   
    try { 
      // Capitalize gender before sending 
      const formattedData = { 
        ...formData, 
        gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1), 
      }; 
   
      const response = await fetch('http://localhost:4444/api/users/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formattedData), 
      }); 
   
      const data = await response.json(); 
   
      if (!response.ok) { 
        throw new Error(data.message || 'Signup failed'); 
      } 
   
      toast.success('Account created successfully!'); 

      // Store user data & token in cookies
      Cookies.set('user', JSON.stringify(data.user), { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('token', data.user.token, { expires: 7, secure: true, sameSite: 'Strict' });

      navigate('/dashboard'); 
   
    } catch (error: any) { 
      toast.error(error.message); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4"> 
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 transition-all hover:shadow-purple-600"> 
        {/* Title */} 
        <h2 className="text-center text-3xl font-bold text-white mb-2">Create Your Account</h2> 
        <p className="text-center text-sm text-gray-400 mb-6"> 
          Already have an account?{' '} 
          <Link to="/login" className="font-medium text-purple-500 hover:text-purple-400"> 
            Sign in 
          </Link> 
        </p> 
 
        {/* Form */} 
        <form className="space-y-5" onSubmit={handleSignup}> 
          <CustomInput 
            type="text" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          /> 
          <CustomInput 
            type="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          /> 
          <CustomInput 
            type="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          /> 
          <CustomInput 
            type="password" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
          /> 
          <CustomInput 
            type="tel" 
            placeholder="Phone Number" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
          /> 
          <CustomInput 
            type="number" 
            placeholder="Age" 
            value={formData.age} 
            onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
          /> 
 
          {/* Gender Dropdown */} 
          <div className="relative"> 
            <select 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none" 
              value={formData.gender} 
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })} 
              required 
            > 
              <option value="" disabled>Select Gender</option> 
              <option value="male">Male</option> 
              <option value="female">Female</option> 
              <option value="other">Other</option> 
            </select> 
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"> 
              ⬇️ 
            </div> 
          </div> 
 
          {/* Submit Button */} 
          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full py-3 px-4 font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 ${ 
              loading && 'opacity-50 cursor-not-allowed' 
            }`} 
          > 
            {loading ? 'Signing Up...' : 'Create Account'} 
          </button> 
        </form> 
      </div> 
    </div> 
  ); 
} 
 
// Reusable Input Component (for cleaner code) 
const CustomInput = ({ type, placeholder, value, onChange }: any) => ( 
  <input 
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" 
  /> 
); 
 
export default Signup;
