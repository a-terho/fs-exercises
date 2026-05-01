import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';

import {
  type Diagnosis,
  type HealthCheckEntry,
  HealthCheckRating,
} from '../../types';
import DiagnosisList from './DiagnosisList';

interface Props {
  data: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

// tämä skaalaa sydämen värin punainen -> keltainen -> vihreä ratingin mukaan
// ja kyllä, kysyin tästä apua AI-kielimallilta
const ratingValues = Object.values(HealthCheckRating);
const [min, max] = [Math.min(...ratingValues), Math.max(...ratingValues)];
const colorMap = ratingValues.map((value) => {
  const normalized = max === min ? 0 : (value - min) / (max - min);
  const hue = (1 - normalized) * 120;
  return `hsl(${hue}, 100%, 50%)`;
});

const EntryHealthCheck = ({ data, diagnoses }: Props) => {
  return (
    <>
      <Typography>
        <strong>{data.date}</strong>
      </Typography>
      <Typography color="textPrimary" sx={{ marginBottom: '0.5em' }}>
        <FavoriteIcon sx={{ color: colorMap[data.healthCheckRating] }} />
        <em>{data.description}</em>
      </Typography>
      <Typography color="textSecondary" sx={{ marginTop: '1em' }}>
        {data.specialist}, specialist
      </Typography>
      <DiagnosisList codes={data.diagnosisCodes} diagnoses={diagnoses} />
    </>
  );
};

export default EntryHealthCheck;
