// src/pages/Booking.tsx
import React, { useState, useEffect } from "react";
import BookingPageCard from "@/components/BookingPageCard";
import BookingCard from "@/components/BookingCard";
import { Car } from "../types/car";
import Squares from "@/blocks/Backgrounds/Squares/Squares";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Booking: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingCard, setShowBookingCard] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/car/all`);
        
        if (response.data.success && response.data.data) {
          setCars(response.data.data);
        } else {
          setError("Failed to fetch car data");
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
    setShowBookingCard(true);
  };

  const closeBookingCard = () => {
    setShowBookingCard(false);
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <div className="absolute opacity-40 inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="down"
          borderColor="#FFC107"
          hoverFillColor="#FFC107"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 mt-14 text-center text-amber-500">
          Car Booking
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900 bg-opacity-50 text-white p-4 rounded-lg text-center">
            {error}
          </div>
        ) : cars.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-50 text-white p-8 rounded-lg text-center">
            No cars available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <BookingPageCard
                key={car._id}
                car={car}
                onClick={() => handleCardClick(car)}
              />
            ))}
          </div>
        )}

        {showBookingCard && selectedCar && (
          <BookingCard car={selectedCar} onClose={closeBookingCard} />
        )}
      </div>
    </div>
  );
};

export default Booking;