import ActivityCard from "@/components/shared/cards/ActivityCard";
import HotelCard from "@/components/shared/cards/HotelCard";
import { getTripById } from "@/lib/actions/trip.actions";
import { Activities, Days, Hotels } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

interface SearchParams {
  params: {
    id: string;
  };
}

const TripDetailsPage = async ({ params }: SearchParams) => {
  const { userId } = await auth();
  const { id } = await params;

  const tripData = await getTripById(userId!, id);

  if (!tripData) {
    notFound();
  }

  return (
    <main className="flex-1 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          {tripData.name}
        </h1>
        <p className="text-lg text-gray-600 mb-8">Budget: {tripData.budget}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Recommended Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tripData?.hotels.map((hotel: Hotels, index: number) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Itinerary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tripData?.days.map((day: Days, index: number) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-orange-500">
                  Day {index + 1}: {day.title}
                </h3>
                {day.activities.map(
                  (activity: Activities, actIndex: number) => (
                    <ActivityCard key={actIndex} activity={activity} />
                  )
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TripDetailsPage;
