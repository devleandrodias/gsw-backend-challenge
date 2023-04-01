import { Request, Response, NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { AppError } from "./../erros/appError";
import { IntegrationError } from "./../erros/integrationError";

export function errorHandling(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      statusMessage: getReasonPhrase(err.statusCode),
      errorType: "Application Error",
      errorMessage: err.message,
    });
  }

  if (err instanceof IntegrationError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      statusMessage: getReasonPhrase(err.statusCode),
      errorType: "Integration Error",
      errorMessage: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    errorType: "Unknown",
    errorMessage: err.message,
  });
}
