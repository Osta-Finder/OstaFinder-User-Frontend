import Hero from "../components/homeComponents/Hero";
import CategoriesSlider from "../components/homeComponents/CategoriesSlider";
import AiHelper from "../components/homeComponents/AiHelper";
import BestWorkers from "../components/homeComponents/BestWorkers";

export default function ClientHome() {
  return <div>
    <Hero/>
    <CategoriesSlider />
    <AiHelper />
    <BestWorkers />
  </div>;
}
