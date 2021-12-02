import { messages } from "@src/config";
import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http-exception";

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || messages.EXCEPTIONS_ERROR;
  response.status(status).send({
    message,
    status,
  });
}
