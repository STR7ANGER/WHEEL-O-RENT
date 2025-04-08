import React, { useState, useEffect } from "react";
import BookingPageCard from "@/components/BookingPageCard";
import BookingCard from "@/components/BookingCard";
import {
  Search,
  MapPin,
  Car,
  DollarSign,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import Squares from "@/blocks/Backgrounds/Squares/Squares";

const dummyCars = [
  {
    id: 1,
    name: "Tesla Model S",
    type: "Electric",
    price: 75,
    location: "New York",
    image: "/api/placeholder/600/400",
    image1: "/api/placeholder/600/400",
    image2: "/api/placeholder/600/400",
    description:
      "Luxury electric sedan with autopilot features and long range battery.",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Toyota Camry",
    type: "Sedan",
    price: 45,
    location: "Los Angeles",
    image: "/api/placeholder/400/250",
    image1: "/api/placeholder/600/400",
    image2: "/api/placeholder/600/400",
    description:
      "Reliable mid-size sedan with excellent fuel economy and comfortable interior.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Ford F-150",
    type: "Truck",
    price: 65,
    location: "Dallas",
    image: "/api/placeholder/400/250",
    image1: "/api/placeholder/600/400",
    image2: "/api/placeholder/600/400",
    description:
      "Powerful pickup truck with towing capability and spacious cabin.",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Honda CR-V",
    type: "SUV",
    price: 55,
    location: "Chicago",
    image: "/api/placeholder/400/250",
    image1: "/api/placeholder/600/400",
    image2: "/api/placeholder/600/400",
    description:
      "Compact SUV with ample cargo space and fuel-efficient engine.",
    rating: 4.4,
  },
  {
    id: 5,
    name: "BMW 3 Series",
    type: "Luxury",
    price: 85,
    location: "Miami",
    image: "/api/placeholder/400/250",
    image1: "/api/placeholder/600/400",
    image2: "/api/placeholder/600/400",
    description: "Premium sedan with sporty handling and upscale features.",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Chevrolet Bolt",
    type: "Electric",
    price: 60,
    location: "Seattle",
    image: "/api/placeholder/400/250",
    image1: "/api/placeholder/600/400",
    image2: "/api/placeholder/600/400",
    description:
      "Compact electric car with impressive range and modern tech features.",
    rating: 4.3,
  },
];

const Booking = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBookingCard, setShowBookingCard] = useState(false);
  const [filteredCars, setFilteredCars] = useState(dummyCars);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100,
    location: "",
    type: "",
    sortPrice: "default",
  });

  const locations = [...new Set(dummyCars.map((car) => car.location))];
  const types = [...new Set(dummyCars.map((car) => car.type))];

  const handleCardClick = (car) => {
    setSelectedCar(car);
    setShowBookingCard(true);
  };

  const closeBookingCard = () => {
    setShowBookingCard(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let result = dummyCars;

    result = result.filter(
      (car) => car.price >= filters.minPrice && car.price <= filters.maxPrice
    );

    if (filters.location) {
      result = result.filter((car) => car.location === filters.location);
    }

    if (filters.type) {
      result = result.filter((car) => car.type === filters.type);
    }

    if (filters.sortPrice === "lowToHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortPrice === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    setFilteredCars(result);
  }, [filters]);

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

        <div className="bg-black bg-opacity-80 rounded-lg shadow-md p-6 mb-8 border border-amber-500">
          <div className="flex items-center mb-4">
            <Filter className="mr-2 text-amber-500" />
            <h2 className="text-xl font-semibold text-white">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-amber-500" />
                Price per Hour: ${filters.minPrice} - ${filters.maxPrice}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  name="minPrice"
                  min="0"
                  max="100"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-full accent-amber-500"
                />
                <input
                  type="range"
                  name="maxPrice"
                  min="0"
                  max="100"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-amber-500" />
                Location
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <Car className="w-4 h-4 mr-1 text-amber-500" />
                Vehicle Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <ArrowUpDown className="w-4 h-4 mr-1 text-amber-500" />
                Sort by Price
              </label>
              <select
                name="sortPrice"
                value={filters.sortPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              >
                <option value="default">Default</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <Search className="w-4 h-4 mr-1 text-amber-500" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search for cars..."
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <BookingPageCard
              key={car.id}
              car={car}
              onClick={() => handleCardClick(car)}
            />
          ))}
        </div>

        {showBookingCard && selectedCar && (
          <BookingCard car={selectedCar} onClose={closeBookingCard} />
        )}
      </div>
    </div>
  );
};

export default Booking;
