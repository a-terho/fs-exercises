import {
  type BackendError,
  type HealthCheckRating,
  type EntryFormData,
  type NewEntry,
} from '../../types';

export const formDataToNewEntry = (data: EntryFormData): NewEntry => {
  const base = {
    description: data.description,
    date: data.date,
    specialist: data.specialist,
    diagnosisCodes: data.diagnosisCodes?.length
      ? data.diagnosisCodes
      : undefined,
  };

  switch (data.type) {
    case 'Hospital':
      return {
        ...base,
        type: 'Hospital',
        discharge: {
          date: data.dischargeDate || '',
          criteria: data.dischargeCriteria || '',
        },
      };

    case 'OccupationalHealthcare':
      return {
        ...base,
        type: 'OccupationalHealthcare',
        employerName: data.employerName || '',
        sickLeave:
          data.sickLeaveStartDate && data.sickLeaveEndDate
            ? {
                startDate: data.sickLeaveStartDate,
                endDate: data.sickLeaveEndDate,
              }
            : undefined,
      };

    case 'HealthCheck':
      return {
        ...base,
        type: 'HealthCheck',
        healthCheckRating: data.healthCheckRating
          ? (Number(data.healthCheckRating) as HealthCheckRating)
          : (0 as HealthCheckRating),
      };

    default: {
      const exhaustiveCheck: never = data.type;
      return exhaustiveCheck;
    }
  }
};

const pathToFieldName = (path: string[]): string => {
  if (path.length === 1) {
    return path[0]; // 'date' -> 'date'
  }

  // ['discharge', 'date'] -> 'dischargeDate'
  // ['sickLeave', 'startDate'] -> 'sickLeaveStartDate'
  return (
    path[0] +
    path
      .slice(1)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join('')
  );
};

export const processBackendErrors = (
  errors: BackendError[],
): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};

  errors.forEach((error) => {
    const fieldName = pathToFieldName(error.path);
    fieldErrors[fieldName] = error.message;
  });

  return fieldErrors;
};
