import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Typography from '@mui/material/Typography';

import EntryFrame from './Entries/EntryFrame';
import NewEntryForm from './NewEntry/NewEntryForm';
import { DiagnosesProvider } from '../Diagnoses/DiagnosesProvider';

import { type NewEntry, type Patient } from '../../types';
import patientService from '../../services/patients';

const EntriesHeader = styled(Typography)({
  marginTop: '1em',
  marginBottom: '0.5em',
});

const PatientPage = () => {
  const params = useParams();
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    if (params.id) {
      patientService.getOne(params.id).then((data) => setPatientData(data));
    }
  }, [params.id]);

  if (!patientData) return null;

  const addEntry = async (entry: NewEntry) => {
    if (params.id) {
      const entryData = await patientService.createEntry(params.id, entry);
      const prevEntries = patientData.entries;
      setPatientData({
        ...patientData,
        entries: prevEntries ? prevEntries.concat(entryData) : [entryData],
      });
    }
  };

  return (
    <DiagnosesProvider>
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
          <EntriesHeader variant="h5">entries</EntriesHeader>
          <NewEntryForm addEntry={addEntry} />
          {patientData.entries.map((entryData) => (
            <EntryFrame key={entryData.id} entry={entryData} />
          ))}
        </>
      ) : (
        <>
          <EntriesHeader variant="h5">no entries yet</EntriesHeader>
          <NewEntryForm addEntry={addEntry} />
        </>
      )}
    </DiagnosesProvider>
  );
};

export default PatientPage;
