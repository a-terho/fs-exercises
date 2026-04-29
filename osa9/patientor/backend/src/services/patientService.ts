import type { PatientSensitive, Patient } from '../types.ts';
import patients from '../../data/patients.ts';

const getAllSensitive = (): PatientSensitive[] => {
  return patients;
};

const getAll = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getAllSensitive, getAll };
