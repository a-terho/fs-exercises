import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

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
    </>
  );
};

export default PatientPage;
