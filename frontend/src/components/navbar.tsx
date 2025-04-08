import { Button } from "@/components/ui/button";
import { useState } from "react";
import { assets } from "./../assets/assets";

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white p-4 flex items-center justify-between shadow-md z-40">
      {/* Company Logo with hover effect */}
      <div
        className="relative flex justify-center items-center ml-28"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Left text that slides in from left */}
        <div
          className={`absolute right-full mr-4 font-bold text-2xl transition-all duration-500 transform ${
            isHovering
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
        >
          WHEEL
        </div>

        {/* The wheel image */}
        <div className="h-14 flex items-center justify-center">
          <img src={assets.wheel} alt="Wheel Logo" className="h-20 hover:rotate-180 duration-200" />
        </div>

        {/* Right text that slides in from right */}
        <div
          className={`absolute left-full ml-4 font-bold text-2xl transition-all duration-500 transform ${
            isHovering ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          RENT
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <a
          href="/booking"
          className="hover:text-gray-300 transition-colors duration-200 font-medium"
        >
          Booking
        </a>
        <a
          href="/listings"
          className="hover:text-gray-300 transition-colors duration-200 font-medium"
        >
          Listings
        </a>
        <Button
          variant="outline"
          className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
