
import { BadgePercent, Clock, CreditCard } from "lucide-react";

const RentalDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Weekend Special",
      tagline: "30% Off Friday to Monday",
      description:
        "Enjoy our luxury vehicles at a discounted rate for weekend getaways. Book now for memorable weekend drives.",
      icon: <Clock className="h-8 w-8 text-amber-500" />,
    },
    {
      id: 2,
      title: "Weekly Package",
      tagline: "Save 25% on 7+ Day Rentals",
      description:
        "Extend your experience with significant savings when you book any vehicle for a week or longer.",
      icon: <BadgePercent className="h-8 w-8 text-amber-500" />,
    },
    {
      id: 3,
      title: "Loyalty Rewards",
      tagline: "10% Back in Points",
      description:
        "Members earn points on every rental that can be redeemed for upgrades, free days, or special add-ons.",
      icon: <CreditCard className="h-8 w-8 text-amber-500" />,
    },
  ];

  return (
    <div className="relative w-full z-20">
      {/* Main section with dark background */}
      <div className="py-20 px-4 relative">
        {/* Overlapping card that sits on top of the section */}
        <div className="absolute top-5 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-black rounded-2xl shadow-xl p-8 border border-yellow-700">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-white">Current</span>{" "}
                <span className="text-amber-500">Deals</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mb-4 relative shadow-md group-hover:shadow-lg group-hover:bg-gray-950 transition-all duration-300">
                      {deal.icon}
                      <div className="absolute inset-0 border-2 border-amber-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <h3 className="text-amber-500 font-bold text-lg mb-2">
                      {deal.title}
                    </h3>
                    <p className="text-white font-medium text-sm mb-2">
                      {deal.tagline}
                    </p>
                    <p className="text-gray-300 text-sm mb-3">
                      {deal.description}
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

export default RentalDeals;
