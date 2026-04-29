import { v1 as uuid } from 'uuid';

import type {
  PatientSensitive,
  Patient,
  NewPatientSensitive,
} from '../types.ts';
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

const addNew = (data: NewPatientSensitive): PatientSensitive => {
  const newPatient: PatientSensitive = {
    id: uuid(),
    ...data,
    // sisältää myös ssn (joka voitaisiin tarpeen mukaan poistaa)
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getAllSensitive, getAll, addNew };
