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

const remove = async (blog) => {
  const config = { headers: { Authorization: `Bearer ${authToken}` } };
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return res.data;
};

// 5.8 ohjaa käyttämään PUT-pyyntöä, tätä ei ole toistaiseksi backendissä
// PATCH-pyyntö toimii joka tapauksessa tässä tarkoituksessa mielekkäämmin
const updateField = async (blog, field, value) => {
  const res = await axios.patch(`${baseUrl}/${blog.id}`, { [field]: value });
  return res.data;
};

export default { setToken, getAll, create, remove, updateField };
