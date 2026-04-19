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

const remove = async (blogId) => {
  const config = { headers: { Authorization: `Bearer ${authToken}` } };
  const res = await axios.delete(`${baseUrl}/${blogId}`, config);
  return res.data;
};

const updateField = async (blogId, field, value) => {
  const res = await axios.patch(`${baseUrl}/${blogId}`, { [field]: value });
  return res.data;
};

const getComments = async (blogId) => {
  const res = await axios.get(`${baseUrl}/${blogId}/comments`);
  return res.data;
};

const addComment = async (blogId, comment) => {
  const config = { headers: { Authorization: `Bearer ${authToken}` } };
  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    config,
  );
  return res.data;
};

export default {
  setToken,
  getAll,
  create,
  remove,
  updateField,
  getComments,
  addComment,
};
