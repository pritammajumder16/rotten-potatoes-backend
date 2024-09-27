import Router, { NextFunction, Request, Response } from "express";
import authRoutes from "../controllers/auth";
import { HttpException } from "../classes/HttpException";
import { errorResponse } from "../utils/response";
const router = Router();

router.use("/auth", authRoutes);

router.use(
  (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    console.log(err);
    errorResponse({ res, message, data: {}, status });
  }
);

export default router;
