import Router, { NextFunction, Request, Response } from "express";

const router = Router();

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default router;
