import Router, { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/response";
import User from "../../../models/user";
import { HttpException } from "../../../classes/HttpException";

const router = Router();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return next(new HttpException(400, "All fields are required"));
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new HttpException(409, "User already exists");
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      successResponse({
        message: "User created successfully",
        data: { user: { username, email } },
        res: response,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
