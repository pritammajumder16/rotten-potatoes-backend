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
