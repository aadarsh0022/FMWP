// app/api/emis/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { startOfMonth, endOfMonth } from "date-fns";
import { connectToDB } from "@/app/backend/utils/db";
import RecurringPayment from "@/app/backend/models/RecurringPayment.model";

export async function GET(req: NextRequest) {
  await connectToDB();

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const statusFilter = searchParams.get("status") || "all";

  const targetDate = month ? new Date(`${month}-01`) : new Date();
  const from = startOfMonth(targetDate);
  const to = endOfMonth(targetDate);

  try {
    const recurringPayments = await RecurringPayment.find({ userId });

    const matchingOccurrences = [];

    for (const payment of recurringPayments) {
      const emisThisMonth = payment.occurrences
        .filter((occ) => {
          const due = new Date(occ.dueDate);
          const inMonth = due >= from && due <= to;
          const matchesStatus =
            statusFilter === "all" || occ.status === statusFilter;
          return inMonth && matchesStatus;
        })
        .map((occ) => ({
          title: payment.title,
          dueDate: occ.dueDate,
          amount: payment.amount,
          status: occ.status,
          type: payment.type,
          account: payment.account,
          category: payment.category,
        }));

      matchingOccurrences.push(...emisThisMonth);
    }

    const totalDueThisMonth = matchingOccurrences
      .filter((emi) => emi.status === "upcoming")
      .reduce((sum, emi) => sum + emi.amount, 0);

    return NextResponse.json({
      success: true,
      data: matchingOccurrences,
      totalDueThisMonth,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching EMIs", error },
      { status: 500 }
    );
  }
}
