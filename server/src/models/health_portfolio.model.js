import mongoose from 'mongoose';

const healthPortfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Personal Health Info
    age: { type: Number, required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], required: true },
    weight: { type: Number, required: true }, // in kg
    height: { type: Number, required: true }, // in cm

    // Medical Conditions
    chronicDiseases: [{ type: String }], // Long-term illnesses like diabetes, hypertension
    allergies: [{ type: String }], // Allergic reactions (e.g., dust, peanuts, medications)

    // Current Medications (Linked to Prescriptions)
    currentMedications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],

    lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('HealthPortfolio', healthPortfolioSchema);
