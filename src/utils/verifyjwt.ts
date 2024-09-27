import jwt from "jsonwebtoken";
import { credentials } from "../constants";

const ACCESS_TOKEN_SECRET = credentials.ACCESS_TOKEN_SECRET!;

export const verifyjwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { _id: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};
