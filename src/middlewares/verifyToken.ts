import { Request, Response, NextFunction } from "express";
import { HttpException } from "../classes/HttpException";
import { verifyjwt } from "../utils/verifyjwt";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken; // Assuming the access token is stored in cookies

  if (!accessToken) {
    return next(new HttpException(401, "Access token is missing"));
  }

  try {
    const userData = verifyjwt(accessToken);
    req.user = userData;
    next();
  } catch (error) {
    next(new HttpException(401, "Invalid access token"));
  }
};

export default verifyToken;
