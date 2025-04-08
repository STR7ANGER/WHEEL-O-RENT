import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";

const addBooking = async (req, res) => {
    try {
        const { 
            vechileId, 
            startTime, 
            endTime, 
            amount, 
            paymentMethod,
            dlNumber,
            userId 
        } = req.body;
        
        // Validate required fields
        if (!vechileId || !startTime || !endTime || !amount || !paymentMethod || !dlNumber) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }
        
        // Check if vehicle exists
        const vehicle = await carModel.findById(vechileId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }
        
        // Create new booking
        const newBooking = new bookingModel({
            userId,
            vechileId,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            amount,
            paymentMethod,
            dlNumber,
            date: Date.now()
        });
        
        // Save to database
        const savedBooking = await newBooking.save();
        
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: savedBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};

const getBooking = async (req, res) => {
    try {
        const { userId, bookingId } = req.body;
        
        let query = {};
        
        // If bookingId is provided, fetch that specific booking
        if (bookingId) {
            query._id = bookingId;
        }
        
        // Add userId to query to ensure user only gets their own bookings
        query.userId = userId;
        
        // Fetch bookings from database
        const bookings = await bookingModel.find(query);
        
        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            });
        }
        
        // Get car details for each booking
        const bookingsWithCarDetails = await Promise.all(
            bookings.map(async (booking) => {
                const car = await carModel.findById(booking.vechileId);
                return {
                    ...booking.toObject(),
                    carDetails: car || { name: "Car details not available" }
                };
            })
        );
        
        return res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookingsWithCarDetails
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
};

export { addBooking, getBooking };