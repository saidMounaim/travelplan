"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, User, Users, Home, Briefcase } from "lucide-react";
import CityAutocomplete from "../CityAutocomplete";
import { addTrip, saveTrip } from "@/lib/actions/trip.actions";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { Activities, Days, Hotels } from "@/lib/types";
import { useRouter } from "next/navigation";

const CreateTripForm = () => {
  const { userId } = useAuth();

  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [travelWith, setTravelWith] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddTrip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!destination || !budget || !travelWith || totalDays <= 0) {
        toast.error("Please fill in all fields correctly before submitting.");
        return;
      }

      let trip = await addTrip({
        destination,
        totalDays,
        budget,
        travelWith,
      });
      const tripToSave = {
        name: trip.trip_name,
        budget: trip.budget,
        userId: userId!,
        days: trip.days.map((day: Days) => ({
          title: day.title,
          activities: day.activities.map((attraction: Activities) => ({
            time: attraction.time,
            activity: attraction.activity,
            image: attraction.image,
            description: attraction.description || "",
            duration: attraction.duration,
          })),
        })),
        hotels: trip.hotels.map((hotel: Hotels) => ({
          name: hotel.name,
          address: hotel.address,
          price: hotel.price.toString(),
          image: hotel.image,
        })),
      };

      trip = await saveTrip(tripToSave);
      toast.success("Trip added successfully!");
      router.push(`/trip/${trip.id}`);
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? `Failed to submit form: ${error.message}`
          : "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddTrip} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="destination">Where do you want to go?</Label>
        <CityAutocomplete query={destination} setQuery={setDestination} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="days">How many days?</Label>
        <Input
          id="days"
          type="number"
          placeholder="Number of days"
          min="1"
          className="border-orange-200 focus:ring-orange-500"
          value={totalDays}
          onChange={(e) => setTotalDays(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label>What is your budget?</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Cheap", "Moderate", "Luxury"].map((option) => (
            <Card
              key={option}
              className={`cursor-pointer transition-colors ${
                budget === option
                  ? "border-orange-500 bg-orange-50"
                  : "border-orange-200 hover:border-orange-300"
              }`}
              onClick={() => setBudget(option)}
            >
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  {option === "Cheap" && (
                    <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  )}
                  {option === "Moderate" && (
                    <div className="flex justify-center mb-2">
                      <DollarSign className="h-8 w-8 text-orange-500" />
                      <DollarSign className="h-8 w-8 text-orange-500" />
                    </div>
                  )}
                  {option === "Luxury" && (
                    <div className="flex justify-center mb-2">
                      <DollarSign className="h-8 w-8 text-orange-500" />
                      <DollarSign className="h-8 w-8 text-orange-500" />
                      <DollarSign className="h-8 w-8 text-orange-500" />
                    </div>
                  )}
                  <span className="font-medium">{option}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Who do you plan on traveling with on your next adventure?</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Just me", icon: User },
            { label: "A couple", icon: Users },
            { label: "Family", icon: Home },
            { label: "Friends", icon: Briefcase },
          ].map(({ label, icon: Icon }) => (
            <Card
              key={label}
              className={`cursor-pointer transition-colors ${
                travelWith === label
                  ? "border-orange-500 bg-orange-50"
                  : "border-orange-200 hover:border-orange-300"
              }`}
              onClick={() => setTravelWith(label)}
            >
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Icon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <span className="font-medium">{label}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-orange-500 text-white hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? "Planning Your Adventure..." : "Plan My Trip"}
      </Button>
    </form>
  );
};

export default CreateTripForm;
