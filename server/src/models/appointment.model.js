import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
  });
  
  const Appointment = mongoose.model("Appointment", appointmentSchema);
  export default Appointment;
  