import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  token:{type: String}
});

const User = mongoose.model("User", userSchema);
export default User;
