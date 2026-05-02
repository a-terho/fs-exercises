import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
const router = express.Router();
export default router;

import {
  type DatabasePatient,
  type Entry,
  type NewEntry,
  type NewPatient,
  type Patient,
  NewEntrySchema,
} from '../types.ts';

import { parseNewPatientData } from '../middleware.ts';
import patientService from '../services/patientService.ts';

router.get('/', (_req, res: Response<Patient[]>) => {
  return res.status(200).json(patientService.getAll());
});

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
    return res.status(200).json(patientData);
  },
);

router.post(
  '/:id/entries',
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry>,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    // siirretty parsimininen middlewaresta suoraan tähän, koska parsija palauttaa
    // objektin, josta on poistettu ylimääräiset kentät, middleware ei muokkaa
    // req.bodya niin parsinta pitäisi tehdä silloin kahdesti
    try {
      const newEntry = NewEntrySchema.parse(req.body);
      const entryData = patientService.addNewEntry(id, newEntry);
      return res.status(200).json(entryData);
    } catch (err: unknown) {
      return next(err);
    }
  },
);
