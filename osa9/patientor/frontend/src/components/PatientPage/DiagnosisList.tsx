import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { type Diagnosis } from '../../types';

interface Props {
  codes: string[] | undefined;
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({ codes, diagnoses }: Props) => {
  if (!codes) return null;

  return (
    <List dense={true}>
      {codes.map((code) => {
        const diagnosis = diagnoses.find((dg) => dg.code === code);
        return (
          <ListItem disablePadding key={code}>
            <ListItemText
              primary={`${code} ${diagnosis ? diagnosis.name : ''}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default DiagnosisList;
