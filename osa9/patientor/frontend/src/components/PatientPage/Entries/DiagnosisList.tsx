import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useDiagnoses } from '../../Diagnoses/useDiagnoses';

interface Props {
  codes: string[] | undefined;
}

const DiagnosisList = ({ codes }: Props) => {
  const diagnoses = useDiagnoses();
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
