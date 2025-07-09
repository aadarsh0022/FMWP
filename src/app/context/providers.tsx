"use client";
import { store } from "@/app/store/store";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "./SessionProvider";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ReduxProvider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </ClerkProvider>
  );
}
