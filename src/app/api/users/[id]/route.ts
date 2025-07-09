import { connectToDB } from "@/app/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/backend/models/User.model";

// GET /api/users/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const clerkUserId = params.id;

  try {
    await connectToDB();

    const user = await User.findOne({ clerkUserId: clerkUserId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
