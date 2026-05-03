import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import EntryHealthCheck from './EntryHealthCheck';
import EntryHospital from './EntryHospital';
import EntryOccupationalHealthcare from './EntryOccupationalHealthcare';

import { type Entry } from '../../../types';

const HospitalFrame = styled(Box)({
  margin: '0.5em',
  padding: '0.5em',
  border: '2px solid red',
});

const OccupationalFrame = styled(Box)({
  margin: '0.5em',
  padding: '0.5em',
  border: '2px solid blue',
});

const HealthCheckFrame = styled(Box)({
  margin: '0.5em',
  padding: '0.5em',
  border: '2px solid green',
});

interface Props {
  entry: Entry;
}

const EntryFrame = ({ entry }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <HospitalFrame>
          <EntryHospital data={entry} />
        </HospitalFrame>
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalFrame>
          <EntryOccupationalHealthcare data={entry} />
        </OccupationalFrame>
      );
    case 'HealthCheck':
      return (
        <HealthCheckFrame>
          <EntryHealthCheck data={entry} />
        </HealthCheckFrame>
      );

    default: {
      const exhaustiveCheck: never = entry;
      return exhaustiveCheck;
    }
  }
};

export default EntryFrame;
