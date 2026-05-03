import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { HealthCheckRating } from '../../../types';

interface Props {
  value: HealthCheckRating;
  setValue: (rating: HealthCheckRating) => void;
}

const HealthCheckSelect = ({ value, setValue }: Props) => {
  const onChange = ({ target }: SelectChangeEvent<typeof value>) => {
    setValue(target.value);
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="health-check-rating">Health check rating</InputLabel>
      <Select labelId="health-check-rating" value={value} onChange={onChange}>
        {Object.entries(HealthCheckRating).map(
          ([desc, rating]: [string, HealthCheckRating]) => (
            <MenuItem key={rating} value={rating}>
              {rating} — {desc}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  );
};

export default HealthCheckSelect;
