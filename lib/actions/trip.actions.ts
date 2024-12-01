"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../prisma";
import { addTripProps, TripData } from "../types";

export async function addTrip({
  destination,
  totalDays,
  budget,
  travelWith,
}: addTripProps) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
  }
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error to generate a trip:", error);
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
      return { error: "User not found" };
    }
    const trip = await prisma.trip.findMany({
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
    return trip;
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
}
