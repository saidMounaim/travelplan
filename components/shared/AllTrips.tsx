import { TripData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DeleteTripButton from "./DeleteTripButton";

const AllTrips = ({ trips, userId }: { trips: TripData[]; userId: string }) => {
  return (
    <>
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
    </>
  );
};

export default AllTrips;
