import mongoose from "mongoose";

import { credentials } from "./constants";
let isConnected: boolean = false;

export const connectToDatabase = async (): Promise<void> => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(credentials.MONGODB_URI!);
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log("Disconnected from MongoDB");
  }
};
