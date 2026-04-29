import express, { type Response } from 'express';
const router = express.Router();
export default router;

import { parsePatientData } from '../utils.ts';
import type { Patient, ErrorResponse } from '../types.ts';
import patientService from '../services/patientService.ts';

router.get('/', (_req, res: Response<Patient[]>) => {
  return res.status(200).json(patientService.getAll());
});

router.post('/', (req, res: Response<Patient | ErrorResponse>) => {
  try {
    const data = parsePatientData(req.body);
    const newPatient = patientService.addNew(data);
    return res.status(201).json(newPatient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    } else {
      return res.status(400).end();
    }
  }
});
