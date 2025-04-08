import { MagicCard } from "./magicui/magic-card";
import { MapPin, Clock, Car } from 'lucide-react';

const BookingPageCard = ({ car, onClick }) => {
  return (
    <MagicCard 
      className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-800 bg-gray-900 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white truncate mr-2">{car.name}</h3>
          <span className="bg-amber-500 text-black text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
            {car.type}
          </span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-2">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-amber-500" />
          <span className="text-sm truncate">{car.location}</span>
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-800">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 flex-shrink-0 text-amber-500" />
            <span className="font-bold text-white">${car.price}</span>
            <span className="text-gray-400 text-sm ml-1">/hour</span>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

export default BookingPageCard;