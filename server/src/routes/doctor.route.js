import express from "express";
import {
  postSignup,
  postLogin,
  postLogout,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctor,
  getDoctorAppointments,
  confirmAppointment,
  cancelAppointment,
  addPrescription,
  getPatientPortfolio,
  getDoctorFeedbacks,
  getMedicalHistoryByUser
} from "../controllers/doctor.controller.js";
import { authDoctor } from "../middlewares/verifyJWT.middleware.js";
import { addInsight } from "../controllers/insights.controller.js";
import { getInsightById } from "../controllers/insights.controller.js";
import { getAllInsights } from "../controllers/insights.controller.js";
import { getInsightsByCategory } from "../controllers/insights.controller.js";

const router = express.Router();

// **Authentication Routes**
router.post("/register", postSignup); // checked
router.post("/login", postLogin); // checked
router.post("/logout", postLogout); // checked

// **Doctor Profile Routes**
router.post("/profile", authDoctor, getDoctorProfile); // checked
router.post("/update", authDoctor, updateDoctorProfile); // checked
router.post("/delete", authDoctor, deleteDoctor); // checked

// **Appointments Routes** 
router.post("/appointments", authDoctor, getDoctorAppointments);  // checked
router.post("/appointments/completed", authDoctor, confirmAppointment); // checked
router.post("/appointments/cancel", authDoctor, cancelAppointment); // checked

// **Prescriptions**
router.post("/prescriptions/add", authDoctor, addPrescription);  // checked

// **Patient Portfolios & Medications**
router.post("/patients/portfolio",authDoctor, getPatientPortfolio); // checked
router.post("/patients/medical_history", authDoctor, getMedicalHistoryByUser); // checked

router.post("/insight/add", authDoctor, addInsight);  //checked
router.post("/insight/id", getInsightById); // checked
router.post("/insight", getAllInsights); // checked
router.post("/insight/category", getInsightsByCategory); // checked

// **Feedback Routes**
router.post("/feedback/get",authDoctor, getDoctorFeedbacks); // checked

export default router;
