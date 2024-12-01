export interface Activities {
  time: string;
  activity: string;
  image?: string;
  description?: string;
  duration?: string;
}

export interface Hotels {
  name: string;
  address: string;
  price: string;
  image: string;
}

export interface Days {
  title: string;
  activities: Activities[];
}

export interface TripData {
  name: string;
  budget: string;
  userId: string;
  days: Days[];
  hotels: Hotels[];
}

export interface addTripProps {
  destination: string;
  totalDays: number;
  budget: string;
  travelWith: string;
}
