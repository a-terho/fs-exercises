import { useState } from 'react';
import axios from 'axios';
import { type ZodIssue } from 'zod/v3';

import { type DiaryEntry, Weather, Visibility } from '../types';
import diaryService from '../services/diaryService';
import Notify from './Notify';

interface Props {
  addEntry: (entry: DiaryEntry) => void;
}

const NewEntryForm = ({ addEntry }: Props) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const showError = (text: string) => {
    setError(text);
    setTimeout(() => setError(''), 10000);
  };

  const submit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (!weather) return showError('Error: Choose a weather');
    if (!visibility) return showError('Error: Choose a visibility');

    diaryService
      .create({
        date,
        weather,
        visibility,
        comment,
      })
      .then((entry: DiaryEntry) => {
        addEntry(entry);
        setDate('');
        setComment('');
        setError('');
      })
      .catch((err: unknown) => {
        if (err instanceof axios.AxiosError && err.response) {
          const issues: ZodIssue[] = err.response.data.error;
          const message = issues
            .map((issue: ZodIssue) => issue.message)
            .join(' ');
          showError(`Error: ${message}`);
        } else {
          showError('Unknown error occured');
        }
      });
  };

  const marginRight = { marginRight: '1em' };

  return (
    <>
      <h2>Add new entry</h2>
      <Notify error={error} />
      <form onSubmit={submit}>
        <div>
          <label>
            <span style={marginRight}>Date:</span>
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <span style={marginRight}>Weather:</span>
          {Object.values(Weather).map((value: string) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="weather"
                value={value}
                onChange={({ target }) => setWeather(target.value as Weather)}
              ></input>
            </label>
          ))}
        </div>
        <div>
          <span style={marginRight}>Visibility:</span>
          {Object.values(Visibility).map((value: string) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="visibility"
                value={value}
                onChange={({ target }) =>
                  setVisibility(target.value as Visibility)
                }
              ></input>
            </label>
          ))}
        </div>
        <div>
          <label>
            <span style={marginRight}>Comment:</span>
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewEntryForm;
