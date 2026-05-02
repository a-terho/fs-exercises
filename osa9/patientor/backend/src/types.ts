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

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z
    .array(z.stringFormat('icd-10', /^[A-Z]\d{2}(\.\d{1,4})?$/))
    .optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

const validRatings = Object.values(HealthCheckRating) as HealthCheckRating[];

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().refine(
    // valitsin toteuttaa hieman dynaamisemman validoinnin virheviestien vuoksi
    (rating) => validRatings.includes(rating as HealthCheckRating),
    {
      message: `invalid health check rating, valid values are: ${validRatings.join(', ')}`,
    },
  ),
});

// uuden käynnin schemat ilman id-kenttää
export const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });
export const NewOccupationalHealthcareEntrySchema =
  OccupationalHealthcareEntrySchema.omit({ id: true });
export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({
  id: true,
});

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// luo diskriminaattori, joka valitsee oikean parsijan 'type' kentän perusteella
// antaa myös asianmukaisen virheilmoituksen, kun 'type' kenttä ei ole validi
export const NewEntrySchema = z.discriminatedUnion('type', [
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHealthCheckEntrySchema,
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;
