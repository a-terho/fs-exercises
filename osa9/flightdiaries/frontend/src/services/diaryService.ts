import axios from 'axios';
import { type NonSensitiveDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((res) => res.data);
};

export default { getAll };
