import Typography from '@mui/material/Typography';

import { type HospitalEntry } from '../../../types';
import DiagnosisList from './DiagnosisList';

interface Props {
  data: HospitalEntry;
}

const EntryHospital = ({ data }: Props) => {
  return (
    <>
      <Typography
        color="textSecondary"
        variant="body2"
        sx={{ marginBottom: '1em' }}
      >
        Discharge date: {data.discharge.date} ({data.discharge.criteria})
      </Typography>
      <Typography>
        <strong>{data.date}</strong>
      </Typography>
      <Typography color="textPrimary" sx={{ marginBottom: '0.5em' }}>
        <em>{data.description}</em>
      </Typography>
      <Typography color="textSecondary" sx={{ marginTop: '1em' }}>
        {data.specialist}, specialist
      </Typography>
      <DiagnosisList codes={data.diagnosisCodes} />
    </>
  );
};

export default EntryHospital;
