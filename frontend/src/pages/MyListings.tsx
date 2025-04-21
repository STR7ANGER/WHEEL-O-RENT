import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingPageCard from "@/components/BookingPageCard";
import Squares from "@/blocks/Backgrounds/Squares/Squares";

// Assuming this interface exists in your project
interface Car {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  location: string;
  category: string;
  date: string;
  userId: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyListings: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCars = async (): Promise<void> => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Get user data from localStorage and parse it
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          setError("User information not found");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);

        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        // Use the userId from the parsed user object
        const response = await axios.post(
          `${API_URL}/api/car/carid`,
          { userId: user.userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setCars(response.data.data);
        } else {
          setError("Failed to fetch your listings");
        }
      } catch (err) {
        console.error("Error fetching user cars:", err);
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCars();
  }, []);

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
          My Listings
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
            You haven't listed any cars yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <BookingPageCard key={car._id} car={car} isOwner={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
