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

export const NewPatientSensitiveSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.stringFormat('ssn', /^\d{6}[-A]\d{3}[0-9A-Z]$/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatientSensitive = z.infer<typeof NewPatientSensitiveSchema>;

export interface PatientSensitive extends NewPatientSensitive {
  id: string;
}

export type Patient = Omit<PatientSensitive, 'ssn'>;
