"use client";

import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Target,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/lib/utils";

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const summaryCards = [
  {
    title: "Monthly Income",
    value: formatINR(8500),
    change: "+12.5%",
    icon: TrendingUp,
    positive: true,
    color: "bg-green-500",
  },
  {
    title: "Monthly Expenses",
    value: formatINR(3240),
    change: "-8.2%",
    icon: TrendingDown,
    positive: false,
    color: "bg-red-500",
  },
  {
    title: "Active Loans",
    value: formatINR(45000),
    change: `EMI: ${formatINR(1200)}`,
    icon: DollarSign,
    positive: false,
    color: "bg-orange-500",
  },
  {
    title: "Savings Goal",
    value: formatINR(12500),
    change: "78% Complete",
    icon: Target,
    positive: true,
    color: "bg-blue-500",
  },
];

const recentTransactions = [
  {
    id: 1,
    description: "Salary Credit",
    amount: formatINR(8500),
    date: "2025-01-15",
    type: "income",
  },
  {
    id: 2,
    description: "Rent Payment",
    amount: `-${formatINR(1200)}`,
    date: "2025-01-14",
    type: "expense",
  },
  {
    id: 3,
    description: "Grocery Shopping",
    amount: `-${formatINR(150)}`,
    date: "2025-01-13",
    type: "expense",
  },
  {
    id: 4,
    description: "Home Loan EMI",
    amount: `-${formatINR(850)}`,
    date: "2025-01-12",
    type: "loan",
  },
];

const upcomingDues = [
  {
    id: 1,
    title: "Car Loan EMI",
    amount: formatINR(350),
    date: "2025-01-20",
    type: "loan",
  },
  {
    id: 2,
    title: "Credit Card Bill",
    amount: formatINR(750),
    date: "2025-01-22",
    type: "expense",
  },
  {
    id: 3,
    title: "Insurance Premium",
    amount: formatINR(300),
    date: "2025-01-25",
    type: "expense",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i} className="shadow-md">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </span>
                <card.icon
                  className={cn("w-5 h-5 text-white p-1 rounded", card.color)}
                />
              </div>
              <div className="text-xl font-bold">{card.value}</div>
              <div
                className={cn(
                  "text-sm",
                  card.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {card.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions & Dues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
            <ul className="space-y-2">
              {recentTransactions.map((txn) => (
                <li
                  key={txn.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{txn.description}</p>
                    <p className="text-xs text-muted-foreground">{txn.date}</p>
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      txn.type === "income" ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {txn.amount}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Upcoming Dues</h2>
            <ul className="space-y-2">
              {upcomingDues.map((due) => (
                <li
                  key={due.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{due.title}</p>
                    <p className="text-xs text-muted-foreground">{due.date}</p>
                  </div>
                  <span className="text-red-600 font-medium">{due.amount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
