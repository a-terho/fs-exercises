import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Typography from '@mui/material/Typography';

import EntryFrame from './EntryFrame';
import { type Patient } from '../../types';
import patientService from '../../services/patients';

const PatientPage = () => {
  const params = useParams();
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    if (params.id) {
      patientService.getOne(params.id).then((data) => setPatientData(data));
    }
  }, [params.id]);

  if (!patientData) return null;

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '0.5em' }}>
        <span>{patientData.name}</span>
        {patientData.gender === 'male' ? (
          <MaleIcon />
        ) : patientData.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <QuestionMarkIcon />
        )}
      </Typography>

      <Typography variant="body1">ssn: {patientData.ssn}</Typography>
      <Typography variant="body1">
        occupation: {patientData.occupation}
      </Typography>
      <Typography variant="body1">
        date of birth: {patientData.dateOfBirth}
      </Typography>
      {patientData.entries && patientData.entries.length > 0 ? (
        <>
          <Typography
            variant="h5"
            sx={{ marginTop: '1em', marginBottom: '0.5em' }}
          >
            entries
          </Typography>
          {patientData.entries.map((entryData) => (
            <EntryFrame key={entryData.id} entry={entryData} />
          ))}
        </>
      ) : (
        <Typography variant="h5" sx={{ marginTop: '1em' }}>
          no entries yet
        </Typography>
      )}
    </>
  );
};

export default PatientPage;
