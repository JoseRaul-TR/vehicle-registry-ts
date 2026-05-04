// src/middleware/errorHandler.js
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

// VALIDERING & FELHANTERING 3: Flytta all felhantering till en egen funktion handleError(err, res) och anropa den i alla catch-block i stället för att upprepa if-satserna.
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let error = { ...err };
  error.message = err.message;

  // MySQL Specific Errors
  if (err.code === "ER_DUP_ENTRY") {
    error = new AppError("Fordonet finns redan.", 400);
  }
  if (err.code === "ER_DATA_TOO_LONG") {
    error = new AppError("Ett eller flera fält är för långa.", 400);
  }

  const statusCode = error.statusCode ?? 500;
  const message = statusCode === 500 ? "Internt serverfel." : error.message;

  if (statusCode === 500) console.error("Critical error:", err);

  res.status(statusCode).json({ error: message });
};
