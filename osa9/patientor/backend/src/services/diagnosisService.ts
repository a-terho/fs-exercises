import { type Diagnosis } from '../types.ts';
import diagnoses from '../../data/diagnoses.ts';

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

export default { getAll };
