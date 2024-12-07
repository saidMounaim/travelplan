import { SignIn } from "@clerk/nextjs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Travel Planner | Sign In",
};

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
