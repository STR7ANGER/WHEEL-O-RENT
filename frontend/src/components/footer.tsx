const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 w-full border-t border-amber-500">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-light text-center  mb-6 mx-auto">
            "Seamless, Affordable, and Reliable Vehicle Rentals –{" "}
            <span className="text-amber-500">
              Your Journey, Your Way, Anytime, Anywhere.
            </span>
            "
          </h2>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4 text-amber-500">
              Our Services
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Car Rentals</li>
              <li>Premium Fleet</li>
              <li>Airport Transfers</li>
              <li>Corporate Services</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium mb-4 text-amber-500">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Roadside Assistance</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium mb-4 text-amber-500">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Sustainability</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium mb-4 text-amber-500">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Rental Agreement</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 max-w-6xl mx-auto"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p>Copyright 2025 - Wheel-O-Rent, All Rights Reserved</p>
          </div>

          <div className="flex space-x-6">
            <span>Facebook</span>
            <span>Twitter</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
