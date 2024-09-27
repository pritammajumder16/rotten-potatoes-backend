import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string }; // Adjust this based on the actual shape of your user data
    }
  }
}
