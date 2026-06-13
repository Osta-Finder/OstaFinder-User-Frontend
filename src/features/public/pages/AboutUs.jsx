import { useEffect } from "react";
import AboutHero from "../components/AboutHero";
import AboutStats from "../components/AboutStats";
import AboutStory from "../components/AboutStory";
import AboutValues from "../components/AboutValues";
import AboutTeam from "../components/AboutTeam";
import AboutCTA from "../components/AboutCTA";

export default function AboutUs() {
  useEffect(() => {
    document.title = "من نحن | أوسطى فايندر - Osta Finder";
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfc] flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Stats Section */}
      <AboutStats />

      {/* 3. Story Section */}
      <AboutStory />

      {/* 4. Values Section */}
      <AboutValues />

      {/* 5. Leadership Team Section */}
      <AboutTeam />

      {/* 6. Call to Action (CTA) Section */}
      <AboutCTA />
    </div>
  );
}

