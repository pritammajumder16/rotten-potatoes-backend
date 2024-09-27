import { CookieOptions } from "express";
import { credentials } from "../constants";

const commonOptions: CookieOptions = {
  httpOnly: true,
  secure: credentials.NODE_ENV === "production",
  sameSite: "strict",
};

const accessTokenCookieConfig: CookieOptions = {
  ...commonOptions,
  maxAge: 1 * 60 * 60 * 1000,
};

const refreshTokenCookieConfig: CookieOptions = {
  ...commonOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export { accessTokenCookieConfig, refreshTokenCookieConfig };
