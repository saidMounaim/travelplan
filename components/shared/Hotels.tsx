import React from "react";
import HotelCard from "./cards/HotelCard";
import { Hotels } from "@/lib/types";

const AllHotels = ({ hotels }: { hotels: Hotels[] }) => {
  return (
    <>
      {hotels.map((hotel: Hotels, index: number) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </>
  );
};

export default AllHotels;
