import axios from 'axios';
const baseUrl = '/api/blogs';

let authToken = null;
const setToken = (token) => {
  authToken = token;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (blog) => {
  const config = { headers: { Authorization: `Bearer ${authToken}` } };
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

export default { setToken, getAll, create };
