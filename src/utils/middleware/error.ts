import { randomUUID } from 'crypto';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  console.error(err);

  if (err instanceof ZodError) {
    res.status(400).json({
      code: randomUUID(),
      error: err.errors
    });

    return;
  }

  const status = err.status ?? 500;

  res.status(status).json({
    code: randomUUID(),
    error: err.message ?? 'Error interno del servidor',
  });
};