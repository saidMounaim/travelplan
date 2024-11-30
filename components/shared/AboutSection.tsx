import React from "react";
import FeatureCard from "./cards/FeatureCard";
import { Bot, Calendar, Map } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-orange-600">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Map className="w-12 h-12 text-orange-500 mb-4" />}
            title="Choose Your Destination"
            description="Tell us where you want to go, and our AI will start crafting your perfect itinerary."
          />
          <FeatureCard
            icon={<Calendar className="w-12 h-12 text-orange-500 mb-4" />}
            title="Set Your Preferences"
            description="Specify your travel dates, interests, and budget to get a
                tailored experience."
          />
          <FeatureCard
            icon={<Bot className="w-12 h-12 text-orange-500 mb-4" />}
            title="AI Creates Your Itinerary"
            description="Our advanced AI generates a detailed day-by-day plan for your
                trip."
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
