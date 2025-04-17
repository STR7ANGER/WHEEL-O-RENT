import { v2 as cloudinary } from "cloudinary";
import carModel from "../models/carsModel.js";

const addCar = async (req, res) => {
    try {
        const { name, description, price, location, category, userId } = req.body;
        
        // Validate required fields (except image since we'll get it from files now)
        if (!name || !description || !price || !location || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // Verify userId exists (should be added by auth middleware)
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User authentication required"
            });
        }
        
        // Handle images from request files
        const image1 = req.files.image1 && req.files?.image1?.[0];
        const image2 = req.files.image2 && req.files?.image2?.[0];
        const image3 = req.files.image3 && req.files?.image3?.[0];
        const image4 = req.files.image4 && req.files?.image4?.[0];
        
        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter(
            (item) => item !== undefined
        );
        
        // Ensure at least one image is provided
        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }
        
        // Upload images to Cloudinary and get URLs
        let imagesURL = await Promise.all(
            images.map(async (item) => {
              let result = await cloudinary.uploader.upload(item.path, {
                resource_type: "image",
              });
              return result.secure_url;
            })
        );
        
        // Create new car document
        const newCar = new carModel({
            name,
            description,
            price: Number(price),
            image: imagesURL, // Now image is an array of URLs
            location,
            category,
            date: Date.now(),
            userId, // Include the userId
        });
        
        // Save to database
        const savedCar = await newCar.save();
        
        return res.status(201).json({
            success: true,
            message: "Car added successfully",
            data: savedCar
        });
    } catch (error) {
        console.error("Error adding car:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add car",
            error: error.message
        });
    }
};

const allCar = async (req, res) => {
    try {
        // Fetch all cars from database
        const cars = await carModel.find();
        
        return res.status(200).json({
            success: true,
            count: cars.length,
            data: cars
        });
    } catch (error) {
        console.error("Error fetching all cars:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch cars",
            error: error.message
        });
    }
};

const getCar = async (req, res) => {
    try {
        const { id, category, location } = req.body;
        
        let query = {};
        
        // Build query based on provided parameters
        if (id) {
            query._id = id;
        }
        
        if (category) {
            query.category = category;
        }
        
        if (location) {
            query.location = location;
        }
        
        // If no valid query parameters, return error
        if (Object.keys(query).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide id, category, or location for filtering"
            });
        }
        
        // Find cars that match the query
        const cars = await carModel.find(query);
        
        if (cars.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No cars found with given criteria"
            });
        }
        
        return res.status(200).json({
            success: true,
            count: cars.length,
            data: cars
        });
    } catch (error) {
        console.error("Error fetching car:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch car",
            error: error.message
        });
    }
};

export { addCar, allCar, getCar };