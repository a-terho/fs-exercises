import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router';
import { useApolloClient, useSubscription } from '@apollo/client/react';

import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import { Notification } from './components/Notification';
import Recommendations from './components/Recommendations';

import { getLocalToken, clearLocalToken } from './localToken';
import { useNotify } from './hooks';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  // lataa tilaan localStoragesta token, jos sellainen on olemassa
  const [token, setToken] = useState(getLocalToken());
  const client = useApolloClient();
  const { notify } = useNotify();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      // kysely nimeää bookAdded -> book, jotta se voidsaan destrukturoida näin
      const { book } = data.data;
      // e2e testit epäonnistuu jos tässä paljastetaan nimi tai otsikko...
      notify('A new book was added to the list!');

      // kirjanlisäyslomake hakee tällä hetkellä lisäyksen jälkeen kaikki kirjat ja
      // kirjailijat uudelleen palvelimelta, mutta tehdään subscriberin saadessa tieto
      // uudesta kirjasta pelkkä jo ladatun queryn päivitys kirjalistan osalta
      // jos ALL_BOOKS queryä ei ole tehty (eli ei ole käyty /books sivulla), cache kyllä
      // päivittyy taustalla, mutta se joka tapauksessa haetaan uudelleen kun sivu avataan
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ books }) => {
        return { books: books.concat(book) };
      });
    },
  });

  // uloskirjautuessa sekä tila, localStorage ja Apollo cache nollataan
  const logout = () => {
    setToken(null);
    clearLocalToken();
    client.resetStore();
  };

  return (
    <>
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
    </>
  );
};

export default App;
