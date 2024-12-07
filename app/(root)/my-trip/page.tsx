import AllTrips from "@/components/shared/AllTrips";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { getAllTripByUserId } from "@/lib/actions/trip.actions";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Travel Planner | My Trip",
};

const MyTripPage = async () => {
  const { userId } = await auth();
  const trips: any = await getAllTripByUserId(userId!);
  return (
    <main className="flex-1 py-12 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">My Trips</h1>
      </div>
      <section className="max-w-7xl mx-auto mt-12">
        {trips?.length === 0 && (
          <h3 className="text-2xl font-bold text-orange-400 mt-3">
            No trips have been added yet.
          </h3>
        )}
        <Suspense fallback={<SkeletonCard />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AllTrips userId={userId!} trips={trips} />
          </div>
        </Suspense>
      </section>
    </main>
  );
};

export default MyTripPage;
