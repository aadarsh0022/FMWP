"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <CreditCard className="h-8 w-8" />
            <h1 className="text-2xl font-bold">LoanTracker</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your loans with ease
          </p>
        </div> */}

        {/* <LoginForm /> */}

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </p>
        </div>
      </div>
    </div>
  );
}
