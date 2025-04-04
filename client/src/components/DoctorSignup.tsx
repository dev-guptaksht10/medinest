import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import toast from "react-hot-toast";

export function DoctorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: [""],
    experience: "",
    hospital: [{ name: "", address: "", specialty: "" }],
    phone: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4444/api/doctors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Doctor account created successfully!");
      navigate("/doctor/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-2xl w-full space-y-8 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-purple-600/20 p-4 rounded-full">
              <Stethoscope className="w-14 h-14 text-purple-500" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Create Doctor Account</h2>
          <p className="mt-3 text-sm text-gray-400">
            Already have an account? {" "}
            <Link to="/doctor/login" className="font-semibold text-purple-500 hover:text-purple-400">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 gap-6">
            <input type="text" placeholder="Full Name" className="input-field border p-3 rounded-md w-full text-black" value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="email" placeholder="Email" className="input-field border p-3 rounded-md w-full text-black" value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="tel" placeholder="Phone Number" className="input-field border p-3 rounded-md w-full text-black" value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            <input type="text" placeholder="Address" className="input-field border p-3 rounded-md w-full text-black" value={formData.address} 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
            <input type="number" placeholder="Experience (Years)" className="input-field border p-3 rounded-md w-full text-black" value={formData.experience} 
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })} required />
            <input type="password" placeholder="Password" className="input-field border p-3 rounded-md w-full text-black" value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <input type="password" placeholder="Confirm Password" className="input-field border p-3 rounded-md w-full text-black" value={formData.confirmPassword} 
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
            
            {formData.specialization.map((spec, index) => (
              <input key={index} type="text" placeholder="Specialization" className="input-field border p-3 rounded-md w-full text-black" value={spec} 
                onChange={(e) => {
                  const newSpecs = [...formData.specialization];
                  newSpecs[index] = e.target.value;
                  setFormData({ ...formData, specialization: newSpecs });
                }} required />
            ))}
            
            {formData.hospital.map((hosp, index) => (
              <div key={index} className="space-y-3 border p-4 rounded-lg bg-gray-700">
                <input type="text" placeholder="Hospital Name" className="input-field border p-3 rounded-md w-full text-black" value={hosp.name} 
                  onChange={(e) => {
                    const newHospitals = [...formData.hospital];
                    newHospitals[index].name = e.target.value;
                    setFormData({ ...formData, hospital: newHospitals });
                  }} required />
                <input type="text" placeholder="Hospital Address" className="input-field border p-3 rounded-md w-full text-black" value={hosp.address} 
                  onChange={(e) => {
                    const newHospitals = [...formData.hospital];
                    newHospitals[index].address = e.target.value;
                    setFormData({ ...formData, hospital: newHospitals });
                  }} required />
                <input type="text" placeholder="Specialty in Hospital" className="input-field border p-3 rounded-md w-full text-black" value={hosp.specialty} 
                  onChange={(e) => {
                    const newHospitals = [...formData.hospital];
                    newHospitals[index].specialty = e.target.value;
                    setFormData({ ...formData, hospital: newHospitals });
                  }} required />
              </div>
            ))}
            
            <button type="submit" className="btn-primary bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all w-full">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
