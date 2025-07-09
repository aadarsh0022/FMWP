import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  clerkUserId: string;
  email: string;
  name: string;
  mobile: string;
  monthlyIncome: number;
  salaryDate: number; // Day of month (1-31)
  createdAt: Date;
  updatedAt: Date;
}
