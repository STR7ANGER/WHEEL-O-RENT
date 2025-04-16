import HowItWorks from "@/pages/HowItWorks";
import RentalDeals from "./RentalDeals";
import WhyChooseUs from "./WhyChooseUs";
import { Particles } from "@/components/magicui/particles";

const Information = () => {
  return (
    <div className="relative">
      {/* Waves component as background */}
      <div className="absolute bg-black inset-0 z-0">
        <Particles
        quantity={500}/>
      </div>

      {/* Content components */}
      <div className="relative z-20">
        <HowItWorks />
        <RentalDeals />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Information;
