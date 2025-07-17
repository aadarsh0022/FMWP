import { NextResponse } from "next/server";

import { connectToDB } from "@/app/backend/utils/db";
import { generateNOccurrences } from "@/app/backend/utils/generateNDates";
import RecurringPayment from "@/app/backend/models/RecurringPayment.model";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const {
      userId,
      title,
      amount,
      startDate,
      frequency = "monthly",
      totalOccurrences,
      type,
      account,
      category,
      description,
    } = body;

    const occurrences = generateNOccurrences(
      new Date(startDate),
      frequency,
      totalOccurrences
    );

    const newRecurringPayment = await RecurringPayment.create({
      userId,
      title,
      amount,
      startDate,
      frequency,
      totalOccurrences,
      occurrences,
      type,
      account,
      category,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Recurring payment created",
        data: newRecurringPayment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("RecurringPayment POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
