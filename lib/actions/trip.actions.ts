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

const prompt = `Generate a detailed ${totalDays}-day travel itinerary for a ${budget} budget trip in ${destination}. The trip is planned for ${travelWith}.

Key Parameters:
- Total Days: ${totalDays}
- Budget: ${budget}
- Destination: ${destination}
- Traveling With: ${travelWith}

Itinerary Guidelines:
1. Daily Activities:
   - Provide 3-5 top attractions or activities per day
   - Include precise timings, descriptions, and durations
   - Ensure a mix of popular sites and unique local experiences
   - Verify that suggested activities are open and accessible during the planned visit

2. Dining Recommendations:
   - Suggest 1-2 nearby dining options for each main activity
   - Include restaurant names, cuisines, and price ranges ($ to $$$$)
   - Focus on local specialties and highly-rated establishments

3. Hotel Suggestions:
   - Recommend 3-5 hotels that fit the specified budget
   - Provide detailed information including name, address, price per night, and customer rating
   - Ensure hotels are in safe, convenient locations for tourists

4. Image Considerations:
   - For all attractions, restaurants, and hotels, include a brief description of what the image should depict
   - Example: "Image: Panoramic view of the Eiffel Tower at sunset"
   - Do not include actual URLs, only descriptive placeholders

5. Budget Adherence:
   - Ensure all suggested activities, dining options, and accommodations align with the specified budget
   - Provide a mix of free and paid activities to balance the itinerary

6. Local Insights:
   - Include brief tips about local customs, best times to visit attractions, or money-saving advice
   - Mention any seasonal events or festivals happening during the visit

Output Format:
Provide the itinerary in the following JSON format:

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

Ensure all information is accurate, up-to-date, and tailored to the specified destination, budget, and traveler preferences. Prioritize creating a balanced, enjoyable, and realistic itinerary that maximizes the travel experience within the given constraints.`;

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
