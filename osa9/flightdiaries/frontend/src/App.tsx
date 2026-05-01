import { useState, useEffect } from 'react';
import { type DiaryEntry, type NonSensitiveDiaryEntry } from './types';

import diaryService from './services/diaryService';
import Entry from './components/Entry';
import NewEntryForm from './components/NewEntryForm';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setEntries(initialEntries);
    });
  }, []);

  const addEntry = (entry: DiaryEntry) => {
    setEntries(entries.concat(entry));
  };

  return (
    <>
      <NewEntryForm addEntry={addEntry} />
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default App;
