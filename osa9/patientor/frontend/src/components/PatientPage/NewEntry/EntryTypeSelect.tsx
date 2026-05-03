import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { EntryType } from '../../../types';

interface Props {
  value: EntryType;
  setValue: (type: EntryType) => void;
}

const EntryTypeSelect = ({ value, setValue }: Props) => {
  const onChange = ({ target }: SelectChangeEvent<typeof value>) => {
    setValue(target.value);
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      variant="standard"
      sx={{ marginBottom: '10px' }}
    >
      <MenuItem value="HealthCheck">Health Check</MenuItem>
      <MenuItem value="OccupationalHealthcare">
        Occupational Healthcare
      </MenuItem>
      <MenuItem value="Hospital">Hospital</MenuItem>
    </Select>
  );
};

export default EntryTypeSelect;
