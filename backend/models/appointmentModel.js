import mongoose from "mongoose";

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },

  // References the 'users' collection
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  
  // References the 'doctors' collection
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },
  
  amount: { type: Number, required: true },
  date: { type: Date, required: true },  // Store the date of appointment in Date format
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

// Create and export appointment model
const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);
export default appointmentModel;
