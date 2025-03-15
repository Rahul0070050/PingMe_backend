import { Request, Response, NextFunction } from "express";
import AppError from "../error"; // Import the custom error class

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `[ERROR] ${err.status || 500} - ${err.message} - ${req.originalUrl}`
  );

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
