"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetUpcomingRecurringPaymentsQuery } from "./slice/dashboardApiSlice";

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardPage() {
  const { data, isLoading } = useGetUpcomingRecurringPaymentsQuery({
    month: "2025-08",
    status: "upcoming",
  });

  const upcomingEmis = data?.data || [];
  const totalDue: number = data?.totalDueThisMonth || 0;

  const sortedEmis = [...upcomingEmis].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateA - dateB;
  });

  console.log("data :", data);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total EMI Due This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formatINR(totalDue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash In Hand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">₹14,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Credited</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">₹65,000</p>
          </CardContent>
        </Card>
      </div>

      {/* EMI List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming EMIs</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : sortedEmis.length === 0 ? (
            <p className="text-sm text-muted-foreground">No EMIs found</p>
          ) : (
            <ul className="space-y-3">
              {sortedEmis.map((emi, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b pb-1 text-sm"
                >
                  <div>
                    <p className="font-medium">{emi.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(emi.dueDate).toLocaleDateString()}
                      {" • "} Account: {emi.account}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      emi.status === "paid" ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {formatINR(emi.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
