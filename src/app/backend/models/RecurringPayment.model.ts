import mongoose, { Schema, Document } from "mongoose";

export interface IRecurringPayment extends Document {
  userId: string;
  title: string;
  amount: number;
  startDate: Date;
  frequency: "monthly" | "weekly" | "yearly";
  totalOccurrences: number;
  occurrences: {
    dueDate: Date;
    status: "upcoming" | "paid" | "missed";
    paidDate?: Date;
  }[];
  type: "loan" | "subscription" | "insurance" | "custom";
  account: string;
  category: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecurringPaymentSchema = new Schema<IRecurringPayment>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    frequency: {
      type: String,
      enum: ["monthly", "weekly", "yearly"],
      default: "monthly",
    },
    totalOccurrences: { type: Number, required: true },
    occurrences: [
      {
        dueDate: Date,
        status: {
          type: String,
          enum: ["upcoming", "paid", "missed"],
          default: "upcoming",
        },
        paidDate: Date,
      },
    ],
    type: {
      type: String,
      enum: ["loan", "subscription", "insurance", "custom"],
      default: "loan",
    },
    account: { type: String, required: true },
    category: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const RecurringPayment =
  (mongoose.models.RecurringPayment as mongoose.Model<IRecurringPayment>) ||
  mongoose.model<IRecurringPayment>("RecurringPayment", RecurringPaymentSchema);

export default RecurringPayment;
