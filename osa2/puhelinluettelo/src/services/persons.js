import axios from 'axios';

const getAll = function () {
  const req = axios.get('http://localhost:3001/persons');
  return req.then((res) => res.data);
};

const add = function (person) {
  const req = axios.post('http://localhost:3001/persons', person);
  return req.then((res) => res.data);
};

const del = function (person) {
  const req = axios.delete(`http://localhost:3001/persons/${person.id}`);
  return req.then((res) => res.data);
};

const update = function (person, value) {
  const req = axios.put(`http://localhost:3001/persons/${person.id}`, value);
  return req.then((res) => res.data);
};

export default { getAll, add, del, update };
