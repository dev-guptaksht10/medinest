import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
        {
            sender: { type: String, enum: ['User', 'Bot'], required: true },
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ChatbotConversation', chatbotSchema);
