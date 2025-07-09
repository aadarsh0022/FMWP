import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkUserId: string;
  email: string;
  name: string;
  mobile: string;
  profileImageUrl: string;
  monthlyIncome: number;
  salaryDate: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    monthlyIncome: {
      type: Number,
      default: 0,
    },
    salaryDate: {
      type: Number,
      default: 1, // 1st of the month
    },
  },
  {
    timestamps: true, // createdAt & updatedAt fields
  }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
export default UserModel;
