import { Routes, Route, NavLink } from 'react-router';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Notification, NotificationProvider } from './components/Notification';

const App = () => (
  <NotificationProvider>
    <div>
      <NavLink to="/">
        <button>authors</button>
      </NavLink>
      <NavLink to="/books">
        <button>books</button>
      </NavLink>
      <NavLink to="/addbook">
        <button>add book</button>
      </NavLink>
    </div>

    <Notification />
    <Routes>
      <Route path="/" element={<Authors />} />
      <Route path="/books" element={<Books />} />
      <Route path="/addbook" element={<NewBook />} />
    </Routes>
  </NotificationProvider>
);

export default App;
