import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: { type: Number, required: true },
  winStreak: { type: Number, required: true },
});

export default mongoose.model("User", userSchema);