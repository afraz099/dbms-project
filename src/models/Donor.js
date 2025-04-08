import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  isProvided: { type: Boolean, default: false },
  donatedAt: { type: Date, default: Date.now },
});



const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);
export default Donor;
