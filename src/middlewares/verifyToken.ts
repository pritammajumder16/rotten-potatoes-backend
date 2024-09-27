import { Request, Response, NextFunction } from "express";
import { HttpException } from "../classes/HttpException";
import { verifyAccessToken } from "../utils/jwt";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return next(new HttpException(401, "Access token is missing"));
  }

  try {
    const userData = verifyAccessToken(accessToken);
    req.user = userData;
    next();
  } catch (error) {
    next(new HttpException(401, "Invalid access token"));
  }
};

export default verifyToken;
