"use server";

import prisma from "../prisma";
import { addTripProps, TripData } from "../types";
import { revalidatePath } from "next/cache";
import { OpenAI } from "openai";

export async function addTrip({
  destination,
  totalDays,
  budget,
  travelWith,
}: addTripProps) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const prompt = `Generate a ${totalDays}-day travel itinerary for a ${budget} budget trip in ${destination}. This trip is for ${travelWith}, including top attractions, their timings, image URLs, and nearby dining options. Also include hotel recommendations with details such as hotel name, address, price, and image URL. Present the itinerary in JSON format as shown below:
  {
    "trip_name": "",
    "budget": "",
    "days": [
      {
        "day": "",
        "title": "",
        "activities": [
          {
            "time": "",
            "activity": "",
            "image": "",
            "description": "",
            "duration": ""
          }
        ]
      }
    ],
    "hotels": [
      {
        "name": "",
        "address": "",
        "price": "",
        "image": ""
      }
    ]
  }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a travel assistant." },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0].message?.content;

    if (!text) {
      throw new Error("No response from OpenAI");
    }

    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating trip:", error);
  }
}

export async function saveTrip(tripData: TripData) {
  try {
    const trip = await prisma.trip.create({
      data: {
        name: tripData.name,
        budget: tripData.budget,
        userId: tripData.userId,
        days: {
          create: tripData.days.map((day) => ({
            title: day.title,
            activities: {
              create: day.activities.map((activity) => ({
                time: activity.time,
                activity: activity.activity,
                image: activity.image,
                description: activity.description,
                duration: activity.duration,
              })),
            },
          })),
        },
        hotels: {
          create: tripData.hotels.map((hotel) => ({
            name: hotel.name,
            address: hotel.address,
            price: hotel.price,
            image: hotel.image,
          })),
        },
      },
    });

    return trip;
  } catch (error) {
    console.error("Error saving trip to database:", error);
  }
}

export async function getTripById(userId: string, tripId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return;
    }
    const trip = await prisma.trip.findFirst({
      where: { userId: user.clerkId, id: tripId },
      include: {
        hotels: true,
        days: {
          include: {
            activities: true,
          },
        },
      },
    });
    return trip;
  } catch (error) {
    console.error("Error fetching trip:", error);
  }
}

export async function getAllTripByUserId(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return;
    }
    const trips = await prisma.trip.findMany({
      where: { userId: user.clerkId },
      include: {
        hotels: true,
        days: {
          include: {
            activities: true,
          },
        },
      },
    });
    return trips;
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
}

export async function deleteTripByUserId(userId: string, tripId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return;
    }
    await prisma.trip.delete({ where: { id: tripId } });
    revalidatePath("/my-trip");
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
}
