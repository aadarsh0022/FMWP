import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, ReactNode } from "react";

// third party
import { useUser } from "@clerk/nextjs";

// types
import { User } from "../store/type";

// constants
import { useGetUserQuery } from "../store/auth/authApiSlice";

// Create context
const SessionContext = createContext<User | null>(null);

// Provider
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const { data } = useGetUserQuery(user?.id, {
    skip: !isSignedIn,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // check if user is logged in
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    } else {
      router.push("/dashboard");
      return;
    }
  }, [user?.id, isSignedIn, router]);

  // if (!isLoaded) {
  //   return <div>Loading session...</div>;
  // }

  return (
    <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
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
