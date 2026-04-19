import { createContext, useState, useEffect } from 'react';
const UserContext = createContext();

import blogService from '../services/blogs';
import loginService from '../services/login';
import persistentUserService from '../services/persistentUser';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserIdentityTo = (data) => {
    // data sisältää kentät username, name ja token
    blogService.setToken(data?.token ? data.token : null);
    setUser(data);
  };

  useEffect(() => {
    const user = persistentUserService.getUser();
    if (user) setUserIdentityTo(user);
  }, []);

  const loginUser = async (username, password) => {
    const user = await loginService.login(username, password);
    persistentUserService.saveUser(user);
    setUserIdentityTo(user);
  };

  const logoutUser = () => {
    persistentUserService.removeUser();
    setUserIdentityTo(null);
  };

  // paljasta muuttujat kontekstia hyödyntävien komponenttien käyttöön
  const exports = {
    user,
    loginUser,
    logoutUser,
  };

  return <UserContext value={exports}>{children}</UserContext>;
};

export { UserContext };
export default UserProvider;
