import axios from 'axios';
const apiURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = (callback) => {
  axios
    .get(`${apiURL}/all/`)
    .then((res) => callback(res.data))
    .catch(() => callback([]));
};

const getOne = (name, callback) => {
  axios
    .get(`${apiURL}/name/${name}`)
    .then((res) => callback(res.data))
    .catch(() => callback(null));
};

export default { getAll, getOne };
