import DeleteTripButton from "@/components/shared/DeleteTripButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTripByUserId } from "@/lib/actions/trip.actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const MyTripPage = async () => {
  const { userId } = await auth();
  const trips: any = await getAllTripByUserId(userId!);
  return (
    <main className="flex-1 py-12 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">My Trips</h1>
      </div>
      <section className="max-w-7xl mx-auto mt-12">
        {trips?.length === 0 ? (
          <h3 className="text-2xl font-bold text-orange-400 mt-3">
            No trips have been added yet.
          </h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips?.map((trip: any) => (
              <Link href={`/trip/${trip.id}`} className="h-full" key={trip.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {trip.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap justify-between items-center gap-3">
                    <p className="text-sm text-gray-600 mb-2">{trip.budget}</p>
                    <DeleteTripButton userId={userId!} tripId={trip.id} />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyTripPage;
