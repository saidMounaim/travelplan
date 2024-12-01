import { getAllTripByUserId } from "@/lib/actions/trip.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const MyTripPage = async () => {
  const { userId } = await auth();
  const trips = await getAllTripByUserId(userId!);
  return <div>My Trips</div>;
};

export default MyTripPage;
