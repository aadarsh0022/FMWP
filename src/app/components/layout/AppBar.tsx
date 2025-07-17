"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";

export function AppBar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4 border-b">
      <div className="text-lg font-semibold">Dashboard</div>

      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8", // Customize size
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </div>
    </header>
  );
}
