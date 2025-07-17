// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <Frown className="w-16 h-16 text-gray-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href="/">
        <Button variant="default" size="lg">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
