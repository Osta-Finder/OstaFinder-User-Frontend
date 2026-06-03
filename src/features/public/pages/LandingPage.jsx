import HeroSection from "../components/HeroSection";
import MarqueeSimple from "../../../components/ui/MarqueeSimple";
import JoinAsWorker from "../components/JoinAsWorker";
import Partner from "../components/Partner";
import HowItWorks from "../components/HowItWorks";
import AISearch from "../components/AISearch";
import PopularCategories from "../components/PopularCategories";
import { testimonials } from "../../../mock/testimonials";
import { testimonialsExtra } from "../../../mock/testimonials_extra";

const handleClick = () => {
  console.log("Button clicked!");
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <HeroSection handleClick={handleClick} />
      <Partner />
      <HowItWorks />
      <AISearch />
      <PopularCategories />
      <div className="flex flex-col gap-6 py-12">
        <MarqueeSimple data={testimonials} direction="right" speed="25" />
        <MarqueeSimple data={testimonialsExtra} direction="left" speed="25" />
      </div>
      <JoinAsWorker handleClick={handleClick} />
    </div>
  );
}
