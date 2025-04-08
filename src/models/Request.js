import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  contact: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
