"use client";
import { usePathname } from "next/navigation";

// clerk
import { SignedIn, UserButton } from "@clerk/nextjs";

// third party
import { Menu, Bell } from "lucide-react";

interface AppBarProps {
  onMenuClick: () => void;
}

export function AppBar({ onMenuClick }: AppBarProps) {
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "Dashboard";

  return (
    <header className="h-16 px-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600">
          <Menu />
        </button>
        <h2 className="text-lg font-semibold capitalize text-gray-800">
          {currentPage}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-gray-600">
          <Bell className="w-5 h-5" />
        </button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default AppBar;
