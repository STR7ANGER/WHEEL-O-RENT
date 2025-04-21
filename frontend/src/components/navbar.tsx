import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white p-4 flex items-center justify-between shadow-md z-40">
      {/* Company Logo with hover effect */}
      <div
        className="relative flex justify-center items-center ml-28 cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => navigate("/")}
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
          <img
            src={assets.wheel}
            alt="Wheel Logo"
            className="h-20 hover:rotate-180 duration-200"
          />
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
        <div
          onClick={() => navigate("/booking")}
          className="hover:text-gray-300 transition-colors duration-200 font-medium"
        >
          Booking
        </div>
        <div
          onClick={() => navigate("/add")}
          className="hover:text-gray-300 transition-colors duration-200 font-medium"
        >
          Listings
        </div>

        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-full bg-amber-600 hover:bg-indigo-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-800">
                  <div className="font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
                <div
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/mybooking");
                  }}
                >
                  My Bookings
                </div>
                <div
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/mylisting");
                  }}
                >
                  My Listings
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
