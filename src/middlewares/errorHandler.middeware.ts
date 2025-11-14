import type { NextFunction, Request, Response } from "express";
import { config } from "../config/config.ts";

interface CustomError {
  statusCode?: number;
  message?: string;
  success?: boolean;
  stack?: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errorStack = config.NODE_ENV === "development" ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    message: message,
    errorStack,
  });
};

export default errorHandler;
