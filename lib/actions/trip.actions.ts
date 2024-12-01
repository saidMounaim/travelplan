"use server";

interface addTripProps {
  destination: string;
  totalDays: number;
  budget: string;
  travelWith: string;
}
export async function addTrip({
  destination,
  totalDays,
  budget,
  travelWith,
}: addTripProps) {
  try {
    console.log("Adding trip with the following details:");
    console.log(`Destination: ${destination}`);
    console.log(`Total Days: ${totalDays}`);
    console.log(`Budget: ${budget}`);
    console.log(`Travel With: ${travelWith}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : "An unexpected error occurred. Please try again later.";

    throw new Error(`Failed to add trip: ${errorMessage}`);
  }
}
