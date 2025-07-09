import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "fmwp",
    });
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
