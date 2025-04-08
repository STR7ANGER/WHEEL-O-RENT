import { Car, CalendarCheck, Search } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse and Select",
      tagline: "Find Your Perfect Ride",
      description:
        "Explore our extensive collection of luxury vehicles and choose the one that matches your style.",
      icon: <Search className="h-8 w-8 text-amber-500" />,
    },
    {
      id: 2,
      title: "Book and Confirm",
      tagline: "Secure Your Experience",
      description:
        "Select your dates, complete your booking details, and confirm your reservation in minutes.",
      icon: <CalendarCheck className="h-8 w-8 text-amber-500" />,
    },
    {
      id: 3,
      title: "Enjoy Your Ride",
      tagline: "Hit the Road in Style",
      description:
        "Pick up your vehicle and experience the thrill of driving your dream car wherever you desire.",
      icon: <Car className="h-8 w-8 text-amber-500" />,
    },
  ];

  return (
    <div className="relative w-full z-20">
      {/* Main section with dark background */}
      <div className="py-20 px-4 relative">
        {/* Overlapping card that sits on top of the section */}
        <div className="absolute -bottom-32 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-black rounded-2xl shadow-xl p-8 border  border-yellow-700">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-white">How It</span>{" "}
                <span className="text-amber-500">Works</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mb-4 relative shadow-md group-hover:shadow-lg group-hover:bg-gray-950 transition-all duration-300">
                      {step.icon}
                      <div className="absolute inset-0 border-2 border-amber-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <h3 className="text-amber-500 font-bold text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white font-medium text-sm mb-2">
                      {step.tagline}
                    </p>
                    <p className="text-gray-300 text-sm mb-3">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to account for the overlapping box */}
      <div className="h-40"></div>
    </div>
  );
};

export default HowItWorks;
