import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import Prescription from "../models/prescription.model.js";
import User from "../models/user.model.js";
import Feedback from "../models/feedback.model.js";
import HealthPortfolio from "../models/health_portfolio.model.js";
import MedicalHistory from "../models/med_history.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postSignup = async (req, res) => {
  try {
    const { name, email, password, specialization, phone, address, hospital, experience } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name, email, password: hashedPassword, specialization, phone, address, hospital, experience
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error registering doctor", error });
  }
};
export const postLogin = async (req, res) => { 
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).select("+password"); // Explicitly include password for comparison
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ docid: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    doctor.token = token;
    await doctor.save();

    res.status(200)
    .cookie("token", token, {
      httpOnly: true,  // Prevents access via JavaScript
      secure: false,   // Set `false` for local testing, `true` for production (HTTPS)
      sameSite: "None", // Required for cross-origin requests
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expires in 7 days
    })
    .json({
      success: true,
      message: "Login Successful",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        phone: doctor.phone,
        token: token
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};


export const postLogout = async (req, res) => {
  try {
    res.status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "None" // Required for cross-origin requests
      })
      .json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};


export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doct._id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.doct._id, req.body, { new: true });

    res.status(200).json({ message: "Profile updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.doct._id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
      const appointments = await Appointment.find({ 
        doctor: req.doct._id, 
        status: "Scheduled"  // Filter only scheduled appointments
      }).populate("user");
  

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

export const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: "Completed" }, { new: true });

    res.status(200).json({ message: "Appointment confirmed", appointment });
  } catch (error) {
    res.status(500).json({ message: "pls try again later", error });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: "Cancelled" }, { new: true });

    res.status(200).json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling appointment", error });
  }
};

export const addPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const newPrescription = new Prescription({ appointment: appointmentId, prescribedMedicines: medicines });
    await newPrescription.save();

    appointment.prescription = newPrescription._id;
    await appointment.save();

    res.status(201).json({ message: "Prescription added successfully", prescription: newPrescription });

  } catch (error) {
    res.status(500).json({ message: "Error adding prescription", error });
  }
};

export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctor: req.params.doctorId }).populate("user");

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions", error });
  }
};

export const getPatientPortfolio = async (req, res) => {
  try {
    const healthPortfolio = await HealthPortfolio.findOne({ userId: req.body.userId }).populate("userId");

    if (!healthPortfolio) {
      return res.status(404).json({ message: "Health portfolio not found" });
    }

    res.status(200).json(healthPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient portfolio", error });
  }
};

export const getMedicalHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const history = await MedicalHistory.find({ userId }).select("-doctorId");

    if (!history.length) {
      return res.status(404).json({ message: "No medical history found for this user" });
    }

    res.status(200).json({ message: "Medical history retrieved", history });
  } catch (error) {
    res.status(500).json({ message: "Error fetching medical history", error });
  }
};

export const getPatientMedications = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("currentMedications");
    res.status(200).json(user.currentMedications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient medications", error });
  }
};

export const getDoctorFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ doctor: req.doct._id });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};
