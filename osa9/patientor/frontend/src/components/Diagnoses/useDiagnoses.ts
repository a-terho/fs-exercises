import { useContext } from 'react';
import { DiagnosesContext } from './DiagnosesContext';

export const useDiagnoses = () => useContext(DiagnosesContext);
