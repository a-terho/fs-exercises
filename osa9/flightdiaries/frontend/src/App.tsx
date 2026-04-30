import { useState, useEffect } from 'react';
import { type NonSensitiveDiaryEntry } from './types';

import diaryService from './services/diaryService';
import DiaryEntry from './components/DiaryEntry';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setEntries(initialEntries);
    });
  }, []);

  return (
    <>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default App;
