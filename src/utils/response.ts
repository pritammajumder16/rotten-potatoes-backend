import { Response } from "express";

export const successResponse = ({
  res,
  message,
  data,
  status = 200,
}: {
  res: Response;
  message: string;
  data: any;
  status?: number;
}) => {
  res.status(status).json({ message, data, success: true });
};

export const errorResponse = ({
  res,
  message,
  data,
  status = 500,
}: {
  res: Response;
  message: string;
  data: any;
  status?: number;
}) => {
  res.status(status).json({ message, data, success: false });
};
