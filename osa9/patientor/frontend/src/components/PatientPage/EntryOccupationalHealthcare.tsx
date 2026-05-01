import Typography from '@mui/material/Typography';

import { type Diagnosis, type OccupationalHealthcareEntry } from '../../types';
import DiagnosisList from './DiagnosisList';

interface Props {
  data: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const EntryOccupationalHealthcare = ({ data, diagnoses }: Props) => {
  return (
    <>
      <Typography>
        <strong>
          {data.date} ({data.employerName})
        </strong>
      </Typography>
      <Typography color="textPrimary">
        <em>{data.description}</em>
      </Typography>
      {data.sickLeave ? (
        <Typography color="textSecondary" sx={{ marginBottom: '0.5em' }}>
          <em>
            SVA: {data.sickLeave.startDate} to {data.sickLeave.endDate}
          </em>
        </Typography>
      ) : null}
      <Typography color="textSecondary" sx={{ marginTop: '1em' }}>
        {data.specialist}, specialist
      </Typography>
      <DiagnosisList codes={data.diagnosisCodes} diagnoses={diagnoses} />
    </>
  );
};

export default EntryOccupationalHealthcare;
