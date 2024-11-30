import { NextResponse } from "next/server";

const API_KEY = process.env.HERE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
    query
  )}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    return NextResponse.json(
      { error: "Failed to fetch geocode data" },
      { status: 500 }
    );
  }
}
