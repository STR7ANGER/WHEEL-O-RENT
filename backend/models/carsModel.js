import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  date: {type: Date,default: Date.now},
  userId: { type: String, required: true },
});

const carModel = 
  mongoose.models.car || mongoose.model("car", carSchema);

export default carModel;