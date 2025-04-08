import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Variety of Car Brands",
      description: "We offer a wide range of automobile brands. Renting a Boomcar is an option.",
      imageUrl: "https://myowncarguy.com/wp-content/uploads/2024/01/Logo-Of-Car-Companies.jpg" // Placeholder for the image
    },
    {
      id: 2,
      title: "Online Payment",
      description: "Quickly rent a boomcar book and pay for it online.",
      imageUrl: "https://cdn.zeebiz.com/sites/default/files/2024/01/03/274966-upigpay.jpg" // Placeholder for the image
    },
    {
      id: 3,
      title: "Best cars",
      description: "We provide to our clients in order to provide them with the best cars.",
      imageUrl: "https://c4.wallpaperflare.com/wallpaper/0/844/990/ferrari-back-view-concept-design-supercar-wallpaper-preview.jpg" // Placeholder for the image
    },
    {
      id: 4,
      title: "Easy Online Booking",
      description: "Our website enables you to easily book a car for rent online.",
      imageUrl: "https://i0.wp.com/www.freestudentprojects.com/wp-content/uploads/2016/05/Online-Ticket-Booking-System.jpg?resize=500%2C300" // Placeholder for the image
    }
  ];

  return (
    <div className="py-20 w-full">
      <div className="w-5/6 mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 mt-16 tracking-tight">
          <span className="text-white">Why</span>{" "}
          <span className="text-amber-500">Choose Us</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-black border-amber-500 border shadow-amber-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl text-amber-500 font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
