import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hotels } from "@/lib/types";
import React from "react";

const HotelCard = ({ hotel }: { hotel: Hotels }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{hotel.name}</CardTitle>
        <CardDescription>{hotel.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={hotel.image}
          alt={hotel.name}
          width={400}
          height={200}
          className="rounded-md mb-4 object-cover w-full"
        />
        <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
