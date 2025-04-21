import React, { useState, useEffect } from "react";
import axios from "axios";
import Squares from "@/blocks/Backgrounds/Squares/Squares";

interface CarDetails {
  _id: string;
  name: string;
  image?: string[];
  description?: string;
  price?: number;
  location?: string;
  category?: string;
}

interface Booking {
  _id: string;
  userId: string;
  vechileId: string;
  startTime: string;
  endTime: string;
  amount: number;
  paymentMethod: string;
  dlNumber: string;
  date: string;
  carDetails: CarDetails;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBookings = async (): Promise<void> => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${API_URL}/api/booking/get`,
          {}, // userId is added by the authUser middleware
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setBookings(response.data.data);
        } else {
          setError("Failed to fetch your bookings");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
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
          My Bookings
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900 bg-opacity-50 text-white p-4 rounded-lg text-center">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-50 text-white p-8 rounded-lg text-center">
            You don't have any bookings yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-gray-800 bg-opacity-60 rounded-lg p-6 shadow-md flex flex-col md:flex-row gap-4"
              >
                <div className="flex-shrink-0 md:w-1/3">
                  {booking.carDetails && booking.carDetails.image && booking.carDetails.image[0] ? (
                    <img
                      src={booking.carDetails.image[0]}
                      alt={booking.carDetails.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow md:w-2/3">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">
                    {booking.carDetails.name || "Unknown Car"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Start Time:</p>
                      <p className="text-white">{formatDate(booking.startTime)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">End Time:</p>
                      <p className="text-white">{formatDate(booking.endTime)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Amount:</p>
                      <p className="text-white">${booking.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Payment Method:</p>
                      <p className="text-white capitalize">{booking.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">DL Number:</p>
                      <p className="text-white">{booking.dlNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Booking Date:</p>
                      <p className="text-white">{formatDate(booking.date)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-block bg-green-800 text-green-100 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;