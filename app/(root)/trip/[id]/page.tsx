import AllHotels from "@/components/shared/Hotels";
import Itinerary from "@/components/shared/Itinerary";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { getTripById } from "@/lib/actions/trip.actions";
import { Days, Hotels } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { Metadata } from "next";

interface pageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: pageParams): Promise<Metadata> {
  const { userId } = await auth();
  const id = (await params).id;

  const tripData = await getTripById(userId!, id);

  return {
    title: `AI Travel Planner | ${tripData?.name}`,
  };
}

const TripDetailsPage = async ({ params }: pageParams) => {
  const { userId } = await auth();
  const id = (await params).id;

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
          <Suspense fallback={<SkeletonCard />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AllHotels hotels={tripData?.hotels as Hotels[]} />
            </div>
          </Suspense>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Itinerary
          </h2>
          <Suspense fallback={<SkeletonCard />}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Itinerary days={tripData?.days as Days[]} />
            </div>
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default TripDetailsPage;
