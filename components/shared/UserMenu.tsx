"use client";

import { UserButton } from "@clerk/nextjs";
import { Calendar, MapPin } from "lucide-react";

const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My trip"
          labelIcon={<MapPin size={15} />}
          href="/my-trip"
        />
        <UserButton.Link
          label="Create trip"
          labelIcon={<Calendar size={15} />}
          href="/create-trip"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;
