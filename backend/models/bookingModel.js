import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  vechileId: { type: String, required: true },
  startTime: { type: Date, required: true },
  dlNumber:{type:Number,required:true},
  endTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "Booking Placed" },
  paymentMethod: { type: String, required: true },
  paymentComplete: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const bookingModel = 
  mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default bookingModel;