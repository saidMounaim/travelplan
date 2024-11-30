import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-orange-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="w-full flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-orange-600">
              Plan Your Dream Trip with AI
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Let our advanced AI create personalized travel itineraries
              tailored just for you. Experience smarter, easier travel planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
