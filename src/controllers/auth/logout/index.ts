import Router, { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/response";

const router = Router();

router.post("/", (request: Request, response: Response, next: NextFunction) => {
  try {
    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");

    successResponse({ message: "Logout successful", data: {}, res: response });
  } catch (error) {
    next(error);
  }
});

export default router;
