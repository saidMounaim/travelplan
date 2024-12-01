import { Plane } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <div className="flex justify-between items-center container mx-auto sm:px-4">
        <Link href="/" className="flex items-center justify-center">
          <Plane className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-2xl font-bold text-orange-500">
            AI Travel Planner
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <SignedOut>
            <Button className="bg-orange-600 hover:bg-orange-400" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

export default Header;
