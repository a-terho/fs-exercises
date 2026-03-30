import axios from 'axios';
const baseUrl = '/api';

const getAll = function () {
  const req = axios.get(`${baseUrl}/persons`);
  return req.then((res) => res.data);
};

const add = function (person) {
  const req = axios.post(`${baseUrl}/persons`, person);
  return req.then((res) => res.data);
};

const del = function (person) {
  const req = axios.delete(`${baseUrl}/persons/${person.id}`);
  return req.then((res) => res.data);
};

const update = function (person, value) {
  const req = axios.put(`${baseUrl}/persons/${person.id}`, value);
  return req.then((res) => res.data);
};

export default { getAll, add, del, update };
