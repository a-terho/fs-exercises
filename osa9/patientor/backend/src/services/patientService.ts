import { v1 as uuid } from 'uuid';

import type { DatabasePatient, Patient, NewPatient } from '../types.ts';
import patients from '../../data/patients.ts';

const getAllSensitive = (): DatabasePatient[] => {
  return patients;
};

const getOneSensitive = (id: string): DatabasePatient | undefined => {
  return patients.find((patient) => patient.id === id);
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

const addNew = (data: NewPatient): DatabasePatient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...data,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getAllSensitive, getOneSensitive, getAll, addNew };
