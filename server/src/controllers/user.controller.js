import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";
import Prescription from "../models/prescription.model.js";
import HealthPortfolio from "../models/health_portfolio.model.js";
import Feedback from "../models/feedback.model.js";
import Alarm from "../models/reminder.model.js";
import ChatbotConversation from '../models/chatbot.model.js';
import Doctor from "../models/doctor.model.js";
import { GoogleGenAI } from "@google/genai";
import MedicalHistory from "../models/med_history.model.js";
import Reminder from "../models/reminder.model.js";

import moment from "moment"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadBatchOnCloudinary } from "../utils/uploadOnCloudinary.util.js";

// **User Authentication**
export const postSignup = async (req, res) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    
    if (existingUser) {
        return res.status(400).json({ message: "Email or phone already in use" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone, age, gender });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const postLogin = async (req, res) => {
  const us = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  console.log(us)
  try {
    const { email, password } = us;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials,user" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const ruser = await User.findOne({ email }).select("-password");
    
    const token = jwt.sign({ userid: ruser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    ruser.token = token;
    await ruser.save();
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
        user: ruser
    });

  } catch (error) {
    res.status(500).json({ message: "pls try again later !!",error: error.message });
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


// **User Profile**
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const userProfile = await HealthPortfolio.findOne({ userId })
      .populate("userId")
      .select("-password");

    if (!userProfile) {
      return res.status(404).json({ message: "User not found,prof" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};


export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await HealthPortfolio.findOneAndUpdate(userId, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// **Doctors**
// Fetch all doctors and filter by specialization if provided
export const getDoctors = async (req, res) => {
  try {
      const doctors = await Doctor.find().select("-password"); // Fetch all doctors without password field
      res.status(200).json({ success: true, doctors });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching doctors", error });
  }
};

export const getSmartDoctors = async (req, res) => {
  try {
      const { specialization } = req.query; // Get specialization from query parameters

      if (!specialization) {
          return res.status(400).json({ success: false, message: "Specialization is required" });
      }

      const doctors = await Doctor.find({ specialization: specialization }).select("-password");

      if (doctors.length === 0) {
          return res.status(404).json({ success: false, message: "No doctors found for this specialization" });
      }

      res.status(200).json({ success: true, doctors });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching doctors", error });
  }
};

// **Appointments**
export const getAppointments = async (req, res) => {
  console.log(req.user._id)
  try {
    const appointments = await Appointment.find({ user: req.user._id }).populate("doctor");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const date = moment().format("YYYY-MM-DD"); 
    const user = req.user;
    const existingAppointment = await Appointment.findOne({
      user: user._id,
      doctor: doctorId,
      status: "Scheduled",
      date: date,
    });
    if (existingAppointment) {
      return res.status(400).json({
        message: "You already have an appointment with this doctor on the same date.",
      });
    }
    const appointment = new Appointment({ user: user._id, doctor: doctorId, date });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.body.appointmentId);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling appointment", error });
  }
};

// **Prescriptions**
export const uploadPrescription = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    let prescription = await Prescription.findOne({ appointment: appointmentId });
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Upload images to Cloudinary if files are provided
    let cloudinaryResponses = [];
    if (req.files && req.files.length > 0) {
      cloudinaryResponses = await uploadBatchOnCloudinary(req.files);
      
      // Assuming cloudinaryResponses contains an array of { url: "", public_id: "" }
      prescription.images = [...prescription.images, ...cloudinaryResponses.map(img => img.url)];
      
      // Save updated prescription
      await prescription.save();
    }

    res.status(200).json({ success: true, prescription });
  } catch (error) {
    console.error("Error in getPrescriptions:", error);
    res.status(500).json({ message: "Error fetching prescription", error });
  }
};


// ✅ Get Prescription by Appointment ID
export const getPrescriptions = async (req, res) => {
  try {
      const { appointmentId } = req.body;
      if (req.files.length == 0) {
          throw new ErrorHandler(400, "Please upload at least one image");
      }
      
      let cloudinaryResponse = await uploadOnCloudinary(req.files);
      
      const prescription = await Prescription.findOne({ appointment: appointmentId });
      if (!prescription) return res.status(404).json({ message: "Prescription not found" });

      res.status(200).json({ success: true, prescription });
  } catch (error) {
      res.status(500).json({ message: "Error fetching prescription", error });
  }
};

export const createOrUpdatePrescription = async (req, res) => {
  try {
      const { appointmentId } = req.body;

      // Ensure the appointment exists
      const appointmentExists = await Appointment.findById(appointmentId);
      if (!appointmentExists) return res.status(404).json({ message: "Appointment not found" });

      const { prescribedMedicines } = req.body;
      // Create or Update the Prescription
      const prescription = await Prescription.findOneAndUpdate(
          { appointment: appointmentId },
          { prescribedMedicines },
          { new: true, upsert: true } // Create new if doesn't exist
      );

      res.status(200).json({ success: true, message: "Prescription saved", prescription });
  } catch (error) {
      res.status(500).json({ message: "Error saving prescription", error });
  }
};

// ✅ Delete Prescription by Appointment ID
export const deletePrescription = async (req, res) => {
  try {
      const { appointmentId } = req.body;

      const prescription = await Prescription.findOneAndDelete({ appointment: appointmentId });
      if (!prescription) return res.status(404).json({ message: "Prescription not found" });

      res.status(200).json({ success: true, message: "Prescription deleted" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting prescription", error });
  }
};


// **Portfolio & Medications**
export const getPortfolio = async (req, res) => {
  try {
      const portfolio = await HealthPortfolio.findOne({ userId: req.user._id }).populate("currentMedications");
      if (!portfolio) return res.status(404).json({ message: "Health Portfolio not found" });

      res.status(200).json({ success: true, portfolio });
  } catch (error) {
      res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

export const updateMedicalHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { illness, treatment, startDate, endDate, doctorId, notes } = req.body;

    // Create or update the user's medical history entry
    const history = await MedicalHistory.findOneAndUpdate(
      { userId, illness }, // Match user and illness
      { treatment, startDate, endDate, doctorId, notes }, // Update fields
      { new: true, upsert: true } // Return updated doc and create if not exists
    );

    res.status(200).json({ message: "Medical history updated successfully", history });
  } catch (error) {
    res.status(500).json({ message: "Error updating medical history", error });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const updatedPortfolio = await HealthPortfolio.findOneAndUpdate({ userId: req.user._id }, req.body, { new: true, upsert: true });
    res.status(200).json({ message: "Portfolio updated successfully", updatedPortfolio });
  } catch (error) {
    res.status(500).json({ message: "Error updating portfolio", error });
  }
};



// **Chatbot**
// **Send a chatbot message**

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message } = req.body;


    const ai = new GoogleGenAI({ apiKey: "AIzaSyDxbA0T3SKnw8izxZyuRTxLPd0x2_m9O7Y" });
    if ( !message) {
      return res.status(400).json({ message: "message is required" });
    }


    let conversation = await ChatbotConversation.findOne({ userId });

    if (!conversation) {
      conversation = new ChatbotConversation({ userId, messages: [] });
    }

    conversation.messages.push({ sender: "User", message });

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: conversation.messages.map((msg) => ({
        role: msg.sender === "User" ? "user" : "model",
        parts: [{ text: msg.message }],
      })),
    });

    const systemPrompt = "You are Medinest's medical assistant. If unsure, advise the user to consult a doctor. Avoid discussing complex diseases without proper context. Keep responses direct and professional.";
    const aiResponse = await chat.sendMessage({
      message: `${systemPrompt}\n\nUser: ${message}\nAI:`,
    });

    const botMessage = aiResponse.text || "I'm not sure. Please consult a doctor.";

    conversation.messages.push({ sender: "Bot", message: botMessage });

    await conversation.save();

    res.status(200).json({ message: "Message sent successfully", conversation });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Error processing chatbot message", error });
  }
};


// **Get chatbot history for a user**
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id; // Correct extraction of userId
    const conversation = await ChatbotConversation.findOne({ userId });

    if (!conversation) {
      return res.status(404).json({ message: "No chat history found" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history", error });
  }
};
// **Feedback**
export const addFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const {doctorId, comment, rating} = req.body;
    const newFeedback = new Feedback({ userId, doctorId: doctorId, comment, rating });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback added successfully", newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error adding feedback", error });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ doctorId: req.body.doctorId }).populate("doctorId");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

export const feedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).populate("doctorId");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

// **Alarms**
export const getAlarms = async (req, res) => {
  try {
    const alarms = await Alarm.find({ userId: req.user._id });
    res.status(200).json(alarms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alarms", error });
  }
};

export const addReminder = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(req.body)
    const { medication, type, time, date, repeat } = req.body;

    const newReminder = new Reminder({ userId, medication, type, time, date, repeat });
    await newReminder.save();

    res.status(201).json({ message: "Reminder added successfully", reminder: newReminder });
  } catch (error) {
    res.status(500).json({ message: "Error adding reminder", error });
  }
};


export const getUserReminders = async (req, res) => {
  try {
    const userId  = req.user._id;

    const reminders = await Reminder.find({ userId })

    if (!reminders.length) {
      return res.status(404).json({ message: "No reminders found" });
    }

    res.status(200).json({ success: true, reminders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reminders", error });
  }
};

export const updateReminderStatus = async (req, res) => {
  try {
    const { reminderId, status } = req.body;

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { status },
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder status updated", reminder: updatedReminder });
  } catch (error) {
    res.status(500).json({ message: "Error updating reminder", error });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { reminderId } = req.body;

    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reminder", error });
  }
};


// Get All Doctors (For Users)
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password"); // Exclude password for security
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Get Doctor by ID (For Users)
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.body.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

// Search Doctors by Specialization or Name
export const searchDoctors = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !Array.isArray(query) || query.length === 0) {
      return res.status(400).json({ message: "Invalid search query" });
    }

    // Search doctors by name or specialization
    const doctors = await Doctor.find({
      $or: [
        { name: { $in: query } },
        { specialization: { $in: query } }
      ]
    });

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

