import { useState, useEffect, type ReactNode } from 'react';
import { DiagnosesContext } from './DiagnosesContext';
import { type Diagnosis } from '../../types';

import diagnosesService from '../../services/diagnoses';

interface Props {
  children: ReactNode;
}

export const DiagnosesProvider = ({ children }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService.getAll().then((data) => setDiagnoses(data));
  }, []);

  return <DiagnosesContext value={diagnoses}>{children}</DiagnosesContext>;
};
