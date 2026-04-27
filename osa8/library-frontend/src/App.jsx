import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router';
import { useApolloClient } from '@apollo/client/react';

import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import { Notification, NotificationProvider } from './components/Notification';

import { getLocalToken, clearLocalToken } from './localToken';
import Recommendations from './components/Recommendations';

const App = () => {
  // lataa tilaan localStoragesta token, jos sellainen on olemassa
  const [token, setToken] = useState(getLocalToken());
  const client = useApolloClient();

  // uloskirjautuessa sekä tila, localStorage ja Apollo cache nollataan
  const logout = () => {
    setToken(null);
    clearLocalToken();
    client.resetStore();
  };

  return (
    <NotificationProvider>
      <div>
        <NavLink to="/">
          <button>authors</button>
        </NavLink>
        <NavLink to="/books">
          <button>books</button>
        </NavLink>
        {token === null ? (
          <NavLink to="/login">
            <button>login</button>
          </NavLink>
        ) : (
          <>
            <NavLink to="/addbook">
              <button>add book</button>
            </NavLink>
            <NavLink to="/recommendations">
              <button>recommend</button>
            </NavLink>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Notification />
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />

        {/* kirjautuneen käyttäjän reitit */}
        <Route path="/addbook" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </NotificationProvider>
  );
};

export default App;
