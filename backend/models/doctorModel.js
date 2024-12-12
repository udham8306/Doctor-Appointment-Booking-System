import mongoose from "mongoose";

// Define doctor schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Date, required: true }, // Use Date type for storing the date
  slots_booked: { type: Object, default: {} }, // Use Object type, but consider refining if you need specific structure
}, { minimize: false }); // Set minimize: false to keep empty objects

// Create and export doctor model
const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;
