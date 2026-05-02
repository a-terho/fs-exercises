import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { NewPatientSchema } from './types.ts';

export const parseNewPatientData = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
};

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: err.issues });
  } else if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  }
  return next(err);
};
