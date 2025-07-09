"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// third party
import { useUser } from "@clerk/nextjs";

type SessionContextType = {
  name: string;
  email: string;
  mobile: string;
  profileImageUrl: string;
  monthlyIncome: number;
  salaryDate: number;
};

// 👇 Create context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// 👇 Provider
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const [userData, setUserData] = useState<SessionContextType>(null);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(user?.id);

  useEffect(() => {
    const fetchDbUser = async () => {
      if (user?.id && isSignedIn) {
        try {
          //   setIsLoading(true);
          const res = await fetch(`/api/users/${user.id}`);
          const data = await res.json();
          setUserData(data.user);
          //   setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch DB user:", error);
        }
      }
    };

    fetchDbUser();
  }, [user?.id]);

  // to do need to check later for this issue

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <SessionContext.Provider value={userData}>
      {children}
    </SessionContext.Provider>
  );
};

// 👇 Hook to access session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
