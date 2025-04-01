import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    prescribedMedicines: [
        {
            name: { type: String, required: true }, // Medicine Name
            dosage: { type: String, required: true }, // e.g., "500mg"
            frequency: { type: String, required: true }, // e.g., "Twice a day"
            duration: { type: String, required: true }, // e.g., "7 days"
            instructions: { type: String } // Additional instructions (e.g., "Take after meals")
        }
    ],
    images: [{ type: String }] // Store Cloudinary image URLs
});

export default mongoose.model('Prescription', prescriptionSchema);
