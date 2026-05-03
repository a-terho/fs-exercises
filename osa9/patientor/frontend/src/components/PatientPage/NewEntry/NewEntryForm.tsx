import { useState } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DiagnosisSelect from './DiagnosisSelect';
import EntryTypeSelect from './EntryTypeSelect';
import HealthCheckSelect from './HealthCheckSelect';

import {
  type Diagnosis,
  type EntryFormData,
  type EntryType,
  type NewEntry,
  HealthCheckRating,
} from '../../../types';
import { formDataToNewEntry, processBackendErrors } from '../utils';

const FormContainer = styled(Box)({
  border: '2px dotted black',
  borderRadius: '10px',
  padding: '10px',
});

const SubContainer = styled(Box)({ margin: '10px' });

const initialFormState: EntryFormData = {
  type: 'HealthCheck',
  date: '',
  description: '',
  specialist: '',
  diagnosisCodes: [],
};

interface Props {
  addEntry: (entry: NewEntry) => Promise<void>;
}

const NewEntryForm = ({ addEntry }: Props) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [formData, setFormData] = useState<EntryFormData>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!opened)
    return (
      <Button
        size="small"
        variant="contained"
        type="button"
        onClick={() => setOpened(true)}
      >
        Add New Entry
      </Button>
    );

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const setEntryType = (type: EntryType) => {
    setFormData({ ...formData, type });
    // tyhjennä virheilmoitukset kun tyyppiä vaihdetaan
    setFieldErrors({});
  };

  const setDiagnosisCodes = (diagnosisCodes: Array<Diagnosis['code']>) => {
    setFormData({ ...formData, diagnosisCodes });
  };

  const setHealthCheckRating = (healthCheckRating: HealthCheckRating) => {
    setFormData({ ...formData, healthCheckRating });
  };

  const submit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    // tyhjennä edelliset virheilmoitukset kun lomake lähetetään
    setFieldErrors({});

    try {
      const apiData = formDataToNewEntry(formData);
      await addEntry(apiData);
      // sulje ja nollaa lomake kun merkintä lisätään onnistuneesti
      setFormData(initialFormState);
      setOpened(false);
    } catch (err: unknown) {
      if (err instanceof axios.AxiosError && err.response) {
        const errors = processBackendErrors(err.response.data.error);
        // aseta kenttäkohtaiset virheilmoitukset backendin palautteen perusteella
        setFieldErrors(errors);
      }
    }
  };

  const propsFor = (fieldName: keyof EntryFormData, date: boolean = false) => {
    const props = {
      name: fieldName,
      value: formData[fieldName] || '',
      onChange: onChange,
      error: !!fieldErrors[fieldName],
      helperText: fieldErrors[fieldName],
      fullWidth: true,
    };

    if (date) {
      return {
        ...props,
        type: 'date',
        InputLabelProps: { shrink: true },
      };
    } else return props;
  };

  return (
    <FormContainer>
      <Typography variant="h6">new entry</Typography>
      <EntryTypeSelect value={formData.type} setValue={setEntryType} />
      <form onSubmit={submit}>
        <TextField
          label="Date"
          required
          variant="standard"
          {...propsFor('date', true)}
        />
        <TextField
          label="Description"
          required
          variant="standard"
          {...propsFor('description')}
        />
        <TextField
          label="Specialist"
          required
          variant="standard"
          {...propsFor('specialist')}
        />
        <DiagnosisSelect
          value={formData.diagnosisCodes}
          setValue={setDiagnosisCodes}
        />
        {formData.type === 'Hospital' && (
          <SubContainer>
            <Typography variant="subtitle1">Discharge</Typography>
            <TextField
              label="Discharge date"
              required
              variant="standard"
              {...propsFor('dischargeDate', true)}
            />
            <TextField
              label="Criteria"
              required
              variant="standard"
              {...propsFor('dischargeCriteria')}
            />
          </SubContainer>
        )}
        {formData.type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer name"
              required
              variant="standard"
              {...propsFor('employerName')}
            />
            <SubContainer>
              <Typography variant="subtitle1">Sick leave</Typography>
              <TextField
                label="Start date"
                variant="standard"
                {...propsFor('sickLeaveStartDate', true)}
              />
              <TextField
                label="End date"
                variant="standard"
                {...propsFor('sickLeaveEndDate', true)}
              />
            </SubContainer>
          </>
        )}
        {formData.type === 'HealthCheck' && (
          <HealthCheckSelect
            value={formData.healthCheckRating || 0}
            setValue={setHealthCheckRating}
          />
        )}
        <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
          <Button variant="contained" type="submit">
            add
          </Button>
          <Button
            variant="outlined"
            type="button"
            onClick={() => setOpened(false)}
          >
            close
          </Button>
        </Box>
      </form>
    </FormContainer>
  );
};

export default NewEntryForm;
