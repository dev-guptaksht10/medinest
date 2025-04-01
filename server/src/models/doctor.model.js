import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    specialization: [{ type: String, required: true }], // Array of specialties
    phone: { type: String },
    address: { type: String },

    hospital: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true },
        specialty: { type: String, required: true },
      },
    ],

    experience: { type: Number, min: 0 }, // Experience in years (must be positive)
    rating: { type: Number, min: 1, max: 5 }, // Min 1, Max 5 rating

    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }], // Doctor's appointments
    token:{type: String}
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export default mongoose.model("Doctor", doctorSchema);
