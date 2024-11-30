import { Plane } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <a className="flex items-center justify-center" href="#">
        <Plane className="h-6 w-6 text-orange-500" />
        <span className="ml-2 text-2xl font-bold text-orange-500">
          AI Travel Planner
        </span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/about"
          className="text-sm font-medium hover:text-orange-500"
        >
          About
        </Link>
        <Link
          href="/plan"
          className="text-sm font-medium hover:text-orange-500"
        >
          Plan
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium hover:text-orange-500"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
