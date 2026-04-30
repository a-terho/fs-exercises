import type { NonSensitiveDiaryEntry } from '../types';

interface Props {
  entry: NonSensitiveDiaryEntry;
}

const DiaryEntry = ({ entry }: Props) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <div>
        Date of flight: <strong>{entry.date}</strong>
      </div>
      <div>Weather: {entry.weather}</div>
      <div>Visibility: {entry.visibility}</div>
    </div>
  );
};

export default DiaryEntry;
