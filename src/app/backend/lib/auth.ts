import { auth } from "@clerk/nextjs/server";

export const requireAuthUser = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("UNAUTHORIZED");
  return userId;
};
