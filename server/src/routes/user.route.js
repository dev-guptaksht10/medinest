import express from "express";
import upload from "../utils/multer.util.js";
import {
  postSignup,
  postLogin,
  postLogout,
  updateUser,
  getProfile,
  deleteUser,
  getAppointments,
  bookAppointment,
  cancelAppointment,
  getPrescriptions,
  uploadPrescription,
  getPortfolio,
  updatePortfolio,
  getDoctors,
  sendMessage,
  getChatHistory,
  addFeedback,
  getFeedback,
  createOrUpdatePrescription,
  deletePrescription,
  updateMedicalHistory,
  feedback,
  getUserReminders,
  addReminder,
  updateReminderStatus,
  deleteReminder,
  getAllDoctors,
  getDoctorById,
  searchDoctors
} from "../controllers/user.controller.js";
import {authUser} from "../middlewares/verifyJWT.middleware.js" // Middleware to protect routes
import { getInsightById } from "../controllers/insights.controller.js";
import { getAllInsights } from "../controllers/insights.controller.js";
import { getInsightsByCategory } from "../controllers/insights.controller.js";

const router = express.Router();

// **Authentication Routes**
router.post("/register", postSignup); // checked
router.post("/login", postLogin); // checked
router.post("/logout", postLogout);  // checked

// **User Profile Routes**
router.post("/profile",authUser, getProfile);  // checked
router.post("/update", authUser, updateUser);  // checked
router.post("/delete", authUser, deleteUser); // checked

// **Appointments Routes**
router.post("/appointments", authUser, getAppointments); // checked
router.post("/appointments/book", authUser, bookAppointment); // checked
router.post("/appointments/cancel", cancelAppointment); // checked

// **Prescriptions Routes**
router.post("/prescriptions", authUser, getPrescriptions);  // checked
router.post("/prescriptions/upload", authUser, upload.array("images"), uploadPrescription); // checked
router.post("/medications", createOrUpdatePrescription); // checked
router.post("/medications/delete", deletePrescription); // checked

router.post('medical/history', authUser, updateMedicalHistory); // checked


router.post("/get/doctors", getAllDoctors); // checked
router.post("/get/id", getDoctorById); // checked
router.post("/get/search", searchDoctors); // checked

// **Health Portfolio & Medications**
router.post("/portfolio", authUser, getPortfolio); // checked
router.post("/portfolio/update", authUser, updatePortfolio); // checked

// **Feedback Routes**
router.post("/feedback/add",authUser, addFeedback); // checked
router.post("/feedback/get",authUser, getFeedback); // checked
router.post("/feedback", authUser,  feedback);

// **Alarms & Reminders**
router.post("/alarms", getUserReminders); // checked
router.post("/alarms/add",authUser, addReminder); // checked
router.post("/alarms/update", authUser, updateReminderStatus);
router.post("/alarms/delete", authUser, deleteReminder); // checked

// **Chatbot Routes**
router.post("/chatbot/message",authUser, sendMessage); // checked
router.post("/chatbot/history",authUser, getChatHistory); // checked

router.post("/insight/id", getInsightById); // checked
router.post("/insight", getAllInsights); // checked
router.post("/insight/category", getInsightsByCategory); // checked

export default router;

