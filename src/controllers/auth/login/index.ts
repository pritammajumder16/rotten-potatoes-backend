import Router, { NextFunction, Request, Response } from "express";
import User from "../../../models/user";
import { HttpException } from "../../../classes/HttpException";
import { successResponse } from "../../../utils/response";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import {
  accessTokenCookieConfig,
  refreshTokenCookieConfig,
} from "../../../config/cookieConfig";

const router = Router();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new HttpException(401, "Invalid credentials");
      }

      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        throw new HttpException(401, "Invalid credentials");
      }

      const accessToken = generateAccessToken(String(user._id));
      const refreshToken = generateRefreshToken(String(user._id));

      response.cookie("accessToken", accessToken, accessTokenCookieConfig);
      response.cookie("refreshToken", refreshToken, refreshTokenCookieConfig);

      successResponse({
        message: "Login successful",
        data: { user: { email } },
        res: response,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
