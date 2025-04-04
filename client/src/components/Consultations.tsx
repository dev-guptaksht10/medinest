import React, { useState, useEffect } from "react";
import { Calendar, Star, Video, X } from "lucide-react";
import toast from "react-hot-toast";

export function Consultations() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentType, setAppointmentType] = useState("");

  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
  };

  const token = getCookie("token");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4444/api/users/get/doctors", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDoctors(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Please try again later.");
      toast.error("Could not load doctors list");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (doctorId, type) => {
    const doctor = doctors.find((doc) => doc._id === doctorId);
    setSelectedDoctor(doctor);
    setAppointmentType(type);
    setShowPaymentPopup(true);
  };

  const handlePayment = async () => {
    try {
      setShowPaymentPopup(false);
      toast.success(`${appointmentType} booked successfully!`);
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center p-8 text-white bg-black min-h-screen">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-400 bg-black min-h-screen">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Doctor Consultations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="border border-gray-800 rounded-lg shadow-md overflow-hidden bg-gray-900 hover:shadow-lg transition-shadow flex flex-col">
            <div className="p-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {doctor.name.split(" ")[1] ? doctor.name.split(" ")[1][0] : doctor.name[0]}
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-blue-300">{doctor.name}</h2>

                  {doctor.specialization && doctor.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doctor.specialization.map((specialty, index) => (
                        <span key={index} className="inline-block bg-gray-800 text-blue-300 text-xs px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}

                  {doctor.hospital && doctor.hospital.length > 0 && (
                    <p className="text-gray-400 text-sm mt-2">
                      <span className="font-medium text-gray-300">Hospital:</span> {doctor.hospital[0].name}
                    </p>
                  )}

                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-gray-300">{doctor.experience ? `${doctor.experience}+ years exp.` : "Rating N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-t border-gray-800">
              <button
                onClick={() => handleBooking(doctor._id, "In-person Visit")}
                className="flex-1 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Visit
              </button>
              <button
                onClick={() => handleBooking(doctor._id, "Video Call")}
                className="flex-1 py-2 bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors flex items-center justify-center"
              >
                <Video className="h-4 w-4 mr-2" />
                Video Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPaymentPopup && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-300">Payment Details</h2>
              <button onClick={() => setShowPaymentPopup(false)} className="text-gray-400 hover:text-gray-200">
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-lg font-medium mb-2 text-white">
                {appointmentType} with {selectedDoctor.name}
              </p>
              {selectedDoctor.specialization && selectedDoctor.specialization.length > 0 && (
                <p className="text-gray-400 mb-2">{selectedDoctor.specialization.join(", ")}</p>
              )}
              {selectedDoctor.hospital && selectedDoctor.hospital.length > 0 && (
                <p className="text-gray-400 mb-4">{selectedDoctor.hospital[0].name}</p>
              )}

              <div className="border-t border-b border-gray-700 py-4 my-4">
                <div className="flex justify-between mb-2 text-gray-300">
                  <span>Consultation Fee</span>
                  <span>₹500</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-white">
                  <span>Total Amount</span>
                  <span>₹500</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setShowPaymentPopup(false)} className="flex-1 py-2 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors text-gray-300">
                Cancel
              </button>
              <button onClick={handlePayment} className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Pay ₹500
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
