import Router, { NextFunction, Request, Response } from "express";
import { HttpException } from "../../classes/HttpException";
import User from "../../models/user";
import { successResponse } from "../../utils/response";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

router.get(
  "/profile",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new HttpException(404, "User not present");
      }
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new HttpException(404, "User not found");
      }
      successResponse({
        message: "User profile fetched successfully",
        data: { user },
        res,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
