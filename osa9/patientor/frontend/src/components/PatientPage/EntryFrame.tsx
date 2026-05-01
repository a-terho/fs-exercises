import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import EntryHealthCheck from './EntryHealthCheck';
import EntryHospital from './EntryHospital';
import EntryOccupationalHealthcare from './EntryOccupationalHealthcare';

import { Entry, Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

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
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (entry.diagnosisCodes) {
      diagnosesService.getAll().then((data) => setDiagnosisList(data));
    }
  }, [entry.diagnosisCodes]);

  switch (entry.type) {
    case 'Hospital':
      return (
        <HospitalFrame>
          <EntryHospital data={entry} diagnoses={diagnosisList} />
        </HospitalFrame>
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalFrame>
          <EntryOccupationalHealthcare data={entry} diagnoses={diagnosisList} />
        </OccupationalFrame>
      );
    case 'HealthCheck':
      return (
        <HealthCheckFrame>
          <EntryHealthCheck data={entry} diagnoses={diagnosisList} />
        </HealthCheckFrame>
      );

    default: {
      const exhaustiveCheck: never = entry;
      return exhaustiveCheck;
    }
  }
};

export default EntryFrame;
