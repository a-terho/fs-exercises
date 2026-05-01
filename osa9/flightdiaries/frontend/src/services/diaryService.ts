import axios from 'axios';
import {
  type NonSensitiveDiaryEntry,
  type NewDiaryEntry,
  type DiaryEntry,
} from '../types';

const baseUrl = '/api/diaries';

const getAll = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((res) => res.data);
};

const create = (entry: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, entry).then((res) => res.data);
};

export default { getAll, create };
