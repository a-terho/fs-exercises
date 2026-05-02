import { v1 as uuid } from 'uuid';

import type {
  DatabasePatient,
  Entry,
  NewEntry,
  NewPatient,
  Patient,
} from '../types.ts';
import patients from '../../data/patients.ts';

const getAllSensitive = (): DatabasePatient[] => {
  return patients;
};

const getOneSensitive = (id: string): DatabasePatient => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error(`patient with id ${id} not found`);
  }
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

const addNewEntry = (patientId: string, data: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (patient) {
    const newEntry = {
      id: uuid(),
      ...data,
    };
    patient.entries.push(newEntry);
    return newEntry;
  } else {
    throw new Error(`patient with id ${patientId} not found`);
  }
};

export default {
  getAllSensitive,
  getOneSensitive,
  getAll,
  addNew,
  addNewEntry,
};
