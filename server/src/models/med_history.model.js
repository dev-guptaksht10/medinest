import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    illness: { type: String, required: true },
    treatment: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    doctorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }],
    notes: { type: String }
});

export default mongoose.model('MedicalHistory', historySchema);
