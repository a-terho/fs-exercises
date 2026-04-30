import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
const router = express.Router();
export default router;

import { z } from 'zod';
import {
  NewPatientSensitiveSchema,
  type NewPatientSensitive,
  type PatientSensitive,
  type Patient,
} from '../types.ts';

import patientService from '../services/patientService.ts';

router.get('/', (_req, res: Response<Patient[]>) => {
  return res.status(200).json(patientService.getAll());
});

const parseNewPatientData = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientSensitiveSchema.parse(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
};

router.post(
  '/',
  parseNewPatientData,
  (
    req: Request<unknown, unknown, NewPatientSensitive>,
    res: Response<PatientSensitive>,
  ) => {
    const patientSensitive = patientService.addNew(req.body);
    return res.status(200).json(patientSensitive); // <- status olisi kai 201, mutta testi testaa 200 koodillla
  },
);

// virheidenkäsittelijä
router.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: err.issues });
  } else {
    return next(err);
  }
});
