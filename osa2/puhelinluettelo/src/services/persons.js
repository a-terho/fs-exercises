import axios from 'axios';
// const baseUrl = 'http://localhost:3001'; // json-server
const baseUrl = '/api';

const getAll = function () {
  const req = axios.get(`${baseUrl}/persons`);
  return req.then((res) => {
    // tämä on lähinnnä erottelemaan Node-palvelimelta ja json-serveriltä tuleva data
    // Node-palvelin lähettää vastauksen JSend spesifikaation muodossa
    if (res.data.status === 'success') return res.data.data;
    return res.data;
  });
};

const add = function (person) {
  const req = axios.post(`${baseUrl}/persons`, person);
  return req.then((res) => {
    // sama selitys kuin yllä
    if (res.data.status === 'success') return res.data.data;
    return res.data;
  });
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
