import { z } from 'zod';

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

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.stringFormat('ssn', /^\d{6}[-A]\d{3}[0-9A-Z]$/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface DatabasePatient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type Patient = Omit<DatabasePatient, 'ssn' | 'entries'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
