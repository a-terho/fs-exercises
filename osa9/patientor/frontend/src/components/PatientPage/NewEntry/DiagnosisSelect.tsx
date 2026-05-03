import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useDiagnoses } from '../../Diagnoses/useDiagnoses';
import { type Diagnosis } from '../../../types';

interface Props {
  value: Array<Diagnosis['code']>;
  setValue: (diagnosisCodes: Array<Diagnosis['code']>) => void;
}

const DiagnosisSelect = ({ value, setValue }: Props) => {
  const diagnoses = useDiagnoses();

  const onChange = ({ target }: SelectChangeEvent<typeof value>) => {
    setValue(
      // valinnan yhteydessä valinnat tallennetaan merkkijonojen listana
      typeof target.value === 'string' ? target.value.split(',') : target.value,
    );
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
      <Select
        labelId="diagnosis-codes"
        multiple
        value={value}
        onChange={onChange}
        renderValue={(selections) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selections.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {diagnoses.map((dg) => (
          <MenuItem key={dg.code} value={dg.code}>
            {dg.code} — {dg.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisSelect;
