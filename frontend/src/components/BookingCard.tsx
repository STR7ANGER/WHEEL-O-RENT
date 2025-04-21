// src/components/BookingCard.tsx
import React, { useState } from "react";
import {
  X,
  Star,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Info,
  Loader,
} from "lucide-react";
import { Car } from "../types/car";
import axios from "axios";

// Import the environment variables directly using Vite's import.meta.env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface BookingCardProps {
  car: Car;
  onClose: () => void;
  onBookingComplete?: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  car,
  onClose,
  onBookingComplete,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);
  const [dlNumber, setDlNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Calculate total price
  const totalPrice = car.price * duration;

  // Calculate end date and time based on start date, time and duration
  const calculateEndDateTime = () => {
    if (!startDate || !startTime) return null;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(
      startDateTime.getTime() + duration * 60 * 60 * 1000
    );
    return endDateTime;
  };

  // Handle booking submission
  const handleBooking = async () => {
    // Form validation
    if (!startDate) {
      setError("Please select a date");
      return;
    }

    if (!startTime) {
      setError("Please select a time");
      return;
    }

    if (!dlNumber) {
      setError("Please enter your driving license number");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = calculateEndDateTime();

      if (!endDateTime) {
        setError("Invalid date/time selection");
        setIsLoading(false);
        return;
      }

      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to make a booking");
        setIsLoading(false);
        return;
      }

      // Create booking payload based on your backend API requirements
      const bookingData = {
        vechileId: car._id, // Your backend uses vechileId
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        amount: totalPrice,
        paymentMethod,
        dlNumber: parseInt(dlNumber),
        // userId will be extracted from token in backend
      };

      // Send request to backend
      const response = await axios.post(
        `${API_URL}/api/booking/add`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Notify parent component about successful booking
        if (onBookingComplete) {
          onBookingComplete(response.data.data._id);
        }
        onClose();
      } else {
        setError(response.data.message || "Failed to create booking");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder rating (since it's not in your backend model)
  const rating = 4.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4">
      <div className="bg-black text-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-500">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition"
          >
            <X className="w-6 h-6 text-amber-500" />
          </button>

          {/* Image Carousel */}
          <div className="grid grid-cols-2 gap-4 p-6">
            <img
              src={car.image[0]}
              alt={`${car.name} - Image 1`}
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src={car.image[1] || car.image[0]}
              alt={`${car.name} - Image 2`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Car Details */}
          <div className="p-6 pt-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold text-amber-500">{car.name}</h2>
              <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                {car.category}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-amber-500 mr-1" />
              <span className="text-gray-300">{car.location}</span>

              {/* Rating Stars */}
              <div className="flex items-center ml-6">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(rating)
                        ? "text-amber-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">({rating})</span>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{car.description}</p>

            {/* Price */}
            <div className="flex items-center mb-6">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <span className="text-xl font-bold text-white">${car.price}</span>
              <span className="text-gray-400">/hour</span>
            </div>

            <div className="border-t border-gray-700 my-6"></div>

            {/* Booking Form */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-amber-500">
                Booking Details
              </h3>

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 flex items-start">
                  <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-amber-500" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-amber-500" />
                    Select Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">
                  Duration (hours)
                </label>
                <div className="flex items-center">
                  <button
                    className="border border-gray-700 rounded-l px-3 py-2 hover:bg-gray-800 bg-gray-900 text-white"
                    onClick={() => setDuration((prev) => Math.max(1, prev - 1))}
                    type="button"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) =>
                      setDuration(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 text-center border-t border-b border-gray-700 py-2 bg-gray-900 text-white"
                    min="1"
                  />
                  <button
                    className="border border-gray-700 rounded-r px-3 py-2 hover:bg-gray-800 bg-gray-900 text-white"
                    onClick={() => setDuration((prev) => prev + 1)}
                    type="button"
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-300">
                    Total:{" "}
                    <span className="font-bold text-amber-500">
                      ${totalPrice}
                    </span>
                  </span>
                </div>
              </div>

              {/* Driver's License Number */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">
                  Driver's License Number
                </label>
                <input
                  type="text"
                  value={dlNumber}
                  onChange={(e) => setDlNumber(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                  placeholder="Enter your DL number"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash on Pickup</option>
                </select>
              </div>
            </div>

            {/* Booking Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition flex items-center justify-center ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                type="button"
                onClick={handleBooking}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2" />
                    Book Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
