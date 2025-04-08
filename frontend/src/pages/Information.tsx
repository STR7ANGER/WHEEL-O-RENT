import HowItWorks from "@/pages/HowItWorks";
import RentalDeals from "./RentalDeals";
import WhyChooseUs from "./WhyChooseUs";
import Particles from "@/blocks/Backgrounds/Particles/Particles";

const Information = () => {
  return (
    <div className="relative">
      {/* Waves component as background */}
      <div className="absolute bg-black inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
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
