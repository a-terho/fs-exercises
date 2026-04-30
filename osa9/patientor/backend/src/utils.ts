// jää käyttämättömäksi

import { type NewPatientSensitive, Gender } from './types.ts';

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isGender = (value: string): value is Gender => {
  return (Object.values(Gender) as string[]).includes(value);
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!isString(value)) {
    throw new Error(`${fieldName} is invalid or missing`);
  }
  return value;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('date of birth is invalid or missing');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('gender is invalid or missing');
  }
  return gender;
};

export const parsePatientData = (object: unknown): NewPatientSensitive => {
  if (
    !object ||
    typeof object !== 'object' ||
    !(
      'name' in object &&
      'dateOfBirth' in object &&
      'ssn' in object &&
      'gender' in object &&
      'occupation' in object
    )
  ) {
    throw new Error('parsing failed, invalid data');
  }

  const patientSensitive: NewPatientSensitive = {
    name: parseString(object.name, 'name'),
    ssn: parseString(object.ssn, 'ssn'),
    occupation: parseString(object.occupation, 'occupation'),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
  };
  return patientSensitive;
};
