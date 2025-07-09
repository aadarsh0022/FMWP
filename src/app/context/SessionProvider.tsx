"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SessionContextType } from "./type";
import { defaultSession } from "./constant";

// 👇 Create context
const SessionContext = createContext<SessionContextType | null>(null);

// 👇 Provider
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const [userData, setUserData] = useState<SessionContextType>(defaultSession);

  useEffect(() => {
    const fetchDbUser = async () => {
      if (!isSignedIn) {
        router.push("/sign-in");
        return;
      }
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/users/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchDbUser();
  }, [user?.id, isSignedIn, router]);

  return (
    <SessionContext.Provider value={userData}>
      {children}
    </SessionContext.Provider>
  );
};

// 👇 Hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
