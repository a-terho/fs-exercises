import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
const router = express.Router();
export default router;

import { z } from 'zod';
import {
  NewPatientSchema,
  type NewPatient,
  type DatabasePatient,
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
    NewPatientSchema.parse(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
};

router.post(
  '/',
  parseNewPatientData,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<DatabasePatient>,
  ) => {
    const patientData = patientService.addNew(req.body);
    return res.status(200).json(patientData); // <- status olisi kai 201, mutta testi testaa 200 koodillla
  },
);

router.get(
  '/:id',
  (req: Request<{ id: string }>, res: Response<DatabasePatient>) => {
    const { id } = req.params;
    const patientData = patientService.getOneSensitive(id);

    if (patientData) {
      return res.status(200).json(patientData);
    } else {
      return res.status(404).end();
    }
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
