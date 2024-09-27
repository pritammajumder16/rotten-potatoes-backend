import jwt from "jsonwebtoken";
import { credentials } from "../constants";

const ACCESS_TOKEN_SECRET =
  credentials.ACCESS_TOKEN_SECRET || "your-access-token-secret";
const REFRESH_TOKEN_SECRET =
  credentials.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { _id: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { _id: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};
