import express from "express";
import { addCar, allCar } from "../controllers/carController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Set up the fields for multiple image uploads
const carImageUpload = upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
]);

// Add car route with file upload middleware
router.post("/add", carImageUpload, addCar);

// Other routes
router.get("/all", allCar);

export default router;