import type { NextFunction, Request, Response } from "express";
import type ApiError from "../utils/ApiError.ts";

interface CustomError {
  statusCode: number;
  message: string;
  success: boolean;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorHandler;
