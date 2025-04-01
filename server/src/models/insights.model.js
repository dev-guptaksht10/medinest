import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true },
  category: { type: String, enum: ["General", "Diet", "Fitness", "Mental Health", "Medical"], default: "General" },
  photo: { type: String, default: "" }, // URL of the image
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true }, // Only doctors can post
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Insight", insightSchema);
