export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export const HealthCheckRating = {
  ['Healthy']: 0,
  ['Low risk']: 1,
  ['High risk']: 2,
  ['Critical risk']: 3,
} as const;

export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

type BaseEntryFormData = Omit<BaseEntry, 'id'>;

export interface EntryFormData extends BaseEntryFormData {
  type: EntryType;
  diagnosisCodes: Array<Diagnosis['code']>; // lomakkella aina näkyvä kenttä

  // Hospital
  dischargeDate?: string;
  dischargeCriteria?: string;

  // OccupationalHealthcare
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;

  // HealthCheck
  healthCheckRating?: HealthCheckRating;
}

export interface BackendError {
  path: string[];
  message: string;
}
