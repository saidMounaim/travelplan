import { SignUp } from "@clerk/nextjs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Travel Planner | Sign Up",
};

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
