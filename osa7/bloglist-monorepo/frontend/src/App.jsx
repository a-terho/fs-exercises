import { Link, Routes, Route, useNavigate } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import styled from 'styled-components';

const NavBar = styled.div`
  background-color: steelblue;
  font-family: Helvetica, sans-serif;
  padding: 1em;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0.1em 0.1em 0.5em black;

  a {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  button {
    background-color: white;
    text-transform: uppercase;
    color: black;
    border: none;
    padding-left: 1em;
    padding-right: 1em;
    margin-left: auto;
    border-radius: 5px;
  }
`;

import Blog from './components/Blog';
import BlogList from './components/BlogList';
import ErrorFallback from './components/ErrorFallback';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import NotFound from './components/NotFound';
import Notification from './components/Notification';
import User from './components/User';
import UserList from './components/UserList';

import useNotify from './hooks/useNotify';
import useUser from './hooks/useUser';

const App = () => {
  const { showNotification, hideNotification } = useNotify();
  const { user, loginUser, logoutUser } = useUser();

  // navigointityökalu
  const navigate = useNavigate();

  // apufunktio axioksen palauttaman vastausobjektin virheviestin eristämiseksi
  const resolveErrorText = (response) => {
    return response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
  };

  const handleLogin = async (username, password) => {
    try {
      await loginUser(username, password);
      hideNotification();
      navigate('/');
    } catch ({ response }) {
      showNotification({ type: 'error', text: resolveErrorText(response) });
    }
  };

  const handleLogout = () => {
    logoutUser();
    showNotification('logged out');
    navigate('/');
  };

  return (
    <>
      <NavBar>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user === null ? (
          <Link to="/login">login</Link>
        ) : (
          <>
            <Link to="/create">new blog</Link>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </NavBar>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Notification />
        <Routes>
          {/* navbarin linkit */}
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/create" element={<NewBlogForm />} />

          {/* yksilöidyt reitit */}
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />

          {/* fallback/splat reitti */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
