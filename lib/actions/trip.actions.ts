"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

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
    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : "An unexpected error occurred. Please try again later.";

    throw new Error(`Failed to add trip: ${errorMessage}`);
  }
}
