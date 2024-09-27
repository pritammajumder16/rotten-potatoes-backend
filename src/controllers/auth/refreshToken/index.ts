// src/controllers/auth.ts
import Router, { NextFunction, Request, Response } from "express";
import User from "../../../models/user";
import { HttpException } from "../../../classes/HttpException";
import { successResponse } from "../../../utils/response";
import { generateAccessToken, verifyRefreshToken } from "../../../utils/jwt";

const router = Router();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return next(new HttpException(401, "Refresh token is missing"));
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await User.findById(payload._id);

      if (!user) {
        throw new HttpException(401, "User not found");
      }

      const newAccessToken = generateAccessToken(String(user._id));

      successResponse({
        res: response,
        message: "Access token refreshed successfully",
        data: { accessToken: newAccessToken },
      });
    } catch (error) {
      next(new HttpException(401, "Invalid refresh token"));
    }
  }
);

export default router;
