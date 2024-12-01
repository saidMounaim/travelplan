"use client";

import React from "react";
import { Button } from "../ui/button";
import { deleteTripByUserId } from "@/lib/actions/trip.actions";
import { toast } from "sonner";

interface DeleteTripButtonProps {
  userId: string;
  tripId: string;
}

const DeleteTripButton = ({ userId, tripId }: DeleteTripButtonProps) => {
  const handleDeleteTrip = async (e: any) => {
    e.preventDefault();
    if (confirm("Are your sure?")) {
      await deleteTripByUserId(userId, tripId);
      toast.success("Your trip was successfully deleted.");
    }
  };

  return (
    <Button variant={"destructive"} onClick={handleDeleteTrip}>
      Delete Trip
    </Button>
  );
};

export default DeleteTripButton;
