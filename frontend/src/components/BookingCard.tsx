import React, { useState } from 'react';
import { X, Star, Calendar, Clock, MapPin, Car, CreditCard, DollarSign } from 'lucide-react';


const BookingCard = ({ car, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  
  const totalPrice = car.price * duration;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center  backdrop-blur-md  p-4">
       
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
              src={car.image1} 
              alt={`${car.name} - Image 1`} 
              className="w-full h-64 object-cover rounded-lg"
            />
            <img 
              src={car.image2} 
              alt={`${car.name} - Image 2`} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          {/* Car Details */}
          <div className="p-6 pt-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold text-amber-500">{car.name}</h2>
              <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                {car.type}
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
                      index < Math.floor(car.rating)
                        ? "text-amber-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">({car.rating})</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">{car.description}</p>
            
            {/* Price */}
            <div className="flex items-center mb-6">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <span className="text-xl font-bold text-white">${car.price}</span>
              <span className="text-gray-400">/hour</span>
            </div>
            
            <div className="border-t border-gray-700 my-6"></div>
            
            {/* Booking Form */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-amber-500">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-amber-500" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
                    min={new Date().toISOString().split('T')[0]}
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
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
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
                    onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border-t border-b border-gray-700 py-2 bg-gray-900 text-white"
                    min="1"
                  />
                  <button 
                    className="border border-gray-700 rounded-r px-3 py-2 hover:bg-gray-800 bg-gray-900 text-white"
                    onClick={() => setDuration(prev => prev + 1)}
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-300">Total: <span className="font-bold text-amber-500">${totalPrice}</span></span>
                </div>
              </div>
            </div>
            
            {/* Payment Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition flex items-center justify-center"
              >
                <CreditCard className="mr-2" />
                Book Now
              </button>
              <button 
                className="flex-1 border border-amber-500 text-amber-500 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;