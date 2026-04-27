export const getLocalToken = () => {
  return localStorage.getItem('library-app-token');
};

export const saveLocalToken = (token) => {
  return localStorage.setItem('library-app-token', token);
};

export const clearLocalToken = () => {
  return localStorage.removeItem('library-app-token');
};
