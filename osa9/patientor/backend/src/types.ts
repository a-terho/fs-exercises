export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Female: 'female',
  Male: 'male',
  Other: 'other',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface PatientSensitive {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type Patient = Omit<PatientSensitive, 'ssn'>;
export type NewPatientSensitive = Omit<PatientSensitive, 'id'>;

export interface ErrorResponse {
  error: string;
}
