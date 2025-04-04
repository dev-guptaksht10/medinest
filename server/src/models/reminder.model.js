import mongoose from 'mongoose';

const alarmSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medication: { type: String, required: true },
    type: { type: String, enum: ['Medication', 'Appointment','General'], required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    repeat: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'None'], default: 'None' },
    status: { type: Boolean, default: true }
});

export default mongoose.model('Reminder', alarmSchema);
