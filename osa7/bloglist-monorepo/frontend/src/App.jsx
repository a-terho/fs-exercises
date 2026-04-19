import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useMatch } from 'react-router';
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

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import BlogList from './components/BlogList';
import ErrorFallback from './components/ErrorFallback';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import NotFound from './components/NotFound';
import Notification from './components/Notification';

import useNotify from './hooks/useNotify';
import useBlogs from './hooks/useBlogs';

const App = () => {
  const [user, setUser] = useState(null);

  // omat custom hookit
  const { showNotification, hideNotification } = useNotify();
  const { isPending, blogs, createBlog, updateBlog, deleteBlog } = useBlogs();

  // navigointityökalu
  const navigate = useNavigate();

  // blogin täsmääjä
  const match = useMatch('/blogs/:id');
  const matchedBlog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;

  const setUserIdentityTo = (data) => {
    // data sisältää kentät username, name ja token
    blogService.setToken(data?.token ? data.token : null);
    setUser(data);
  };

  // apufunktio, joka etsii soveltuvan virheilmoituksen ilmoitusikkunaan
  const displayErrorFromResponse = (response) => {
    const text = response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
    showNotification({ type: 'error', text });
  };

  useEffect(() => {
    const jsonData = window.localStorage.getItem('blogAppUserIdentity');
    if (jsonData) {
      const data = JSON.parse(jsonData);
      setUserIdentityTo(data);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const data = await loginService.login(username, password);
      window.localStorage.setItem('blogAppUserIdentity', JSON.stringify(data));
      setUserIdentityTo(data);
      hideNotification();
      navigate('/');
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUserIdentity');
    setUserIdentityTo(null);
    showNotification('logged out');
    navigate('/');
  };

  const addBlog = async (blog) => {
    try {
      await createBlog(blog);
      showNotification(`new blog '${blog.title}' by ${blog.author} was added`);

      // palaa etusivulle ja välitä komponentille tieto onnistuneesta lisäyksestä
      navigate('/');
      return true;
    } catch ({ response }) {
      displayErrorFromResponse(response);
      return false;
    }
  };

  const removeBlog = async (blog) => {
    // varmista poisto käyttäjltä ennen etenemistä
    if (!window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`))
      return;

    try {
      await deleteBlog(blog);
      navigate('/');
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const addLike = async (blog) => {
    try {
      await updateBlog(blog, 'likes', blog.likes + 1);
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  return (
    <>
      <NavBar>
        <Link to="/">blogs</Link>
        {user === null && <Link to="/login">login</Link>}
        {user && (
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
          <Route
            path="/"
            element={
              // latauksen aikana näytetään placeholder latausteksti
              isPending ? <p>loading blogs...</p> : <BlogList blogs={blogs} />
            }
          />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/create"
            element={<NewBlogForm onBlogPost={addBlog} />}
          />

          {/* yksilöidyt reitit */}
          <Route
            path="/blogs/:id"
            element={
              <Blog
                user={user}
                blog={matchedBlog}
                onLike={addLike}
                onRemove={removeBlog}
              />
            }
          />

          {/* fallback/splat reitti */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
