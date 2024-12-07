import React from "react";
import ActivityCard from "./cards/ActivityCard";
import { Activities, Days } from "@/lib/types";

const Itinerary = ({ days }: { days: Days[] }) => {
  return (
    <>
      {days.map((day: any, index: number) => (
        <div key={index} className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-500">
            Day {index + 1}: {day.title}
          </h3>
          {day.activities.map((activity: Activities, actIndex: number) => (
            <ActivityCard key={actIndex} activity={activity} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Itinerary;
