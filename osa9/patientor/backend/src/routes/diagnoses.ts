import express, { type Response } from 'express';
const router = express.Router();
export default router;

import { type Diagnosis } from '../types.ts';
import diagnosisService from '../services/diagnosisService.ts';

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  return res.status(200).json(diagnosisService.getAll());
});
