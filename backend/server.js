import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import bookingRouter from "./routes/bookingRoute";
import userRouter from "./routes/userRoute";
import carRouter from "./routes/carRoute";

//App config
const app = express();
const port = process.env.port || 5000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/booking", bookingRouter);
app.use("/api/car", carRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on Port: " + port));
