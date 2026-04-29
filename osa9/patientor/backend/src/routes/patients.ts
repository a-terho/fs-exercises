import express, { type Response } from 'express';
const router = express.Router();
export default router;

import { type Patient } from '../types.ts';
import patientService from '../services/patientService.ts';

router.get('/', (_req, res: Response<Patient[]>) => {
  return res.status(200).json(patientService.getAll());
});
