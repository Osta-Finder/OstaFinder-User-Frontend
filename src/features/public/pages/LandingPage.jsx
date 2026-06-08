import HeroSection from "../components/HeroSection";
import MarqueeSimple from "../../../components/ui/MarqueeSimple";
import JoinAsWorker from "../components/JoinAsWorker";
import Partner from "../components/Partner";
import HowItWorks from "../components/HowItWorks";
import AISearch from "../components/AISearch";
import PopularCategories from "../components/PopularCategories";
import BestWorkers from "../../client/components/homeComponents/BestWorkers";
import { testimonials } from "../../../mock/testimonials";
import { testimonialsExtra } from "../../../mock/testimonials_extra";
import { useGetMeQuery } from "../../../services/authApi";

const handleClick = () => {
  console.log("Button clicked!");
};

export default function LandingPage() {
  const isLoggedIn = localStorage.getItem("loggedIN") === "true";
  const { data: user } = useGetMeQuery(undefined, { skip: !isLoggedIn });

  const role = user?.role;
  const isGuest = !isLoggedIn;
  const isClient = role === "client";
  const isWorker = role === "worker";

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <HeroSection handleClick={handleClick} />
      <Partner />
      {isGuest && <HowItWorks />}

      {isGuest && <AISearch />}
      {isGuest && <PopularCategories />}
      {isClient && <PopularCategories />}
      {isClient && <AISearch />}
      {isGuest && (
        <div className="flex flex-col gap-6 py-12">
          <MarqueeSimple data={testimonials} direction="right" speed="25" />
          <MarqueeSimple data={testimonialsExtra} direction="left" speed="25" />
        </div>
      )}

      {(isGuest || isWorker) && <JoinAsWorker handleClick={handleClick} />}

      {isClient && <BestWorkers />}
    </div>
  );
}