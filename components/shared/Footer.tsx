import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex justify-between items-center container mx-auto sm:px-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 AI Travel Planner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
