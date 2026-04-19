const getUser = () => {
  const data = window.localStorage.getItem('blogAppUserIdentity');
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const saveUser = (user) => {
  window.localStorage.setItem('blogAppUserIdentity', JSON.stringify(user));
};

const removeUser = () => {
  window.localStorage.removeItem('blogAppUserIdentity');
};

export default { getUser, saveUser, removeUser };
