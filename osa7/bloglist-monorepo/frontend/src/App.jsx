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

import Blog from './components/Blog';
import BlogList from './components/BlogList';
import ErrorFallback from './components/ErrorFallback';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import NotFound from './components/NotFound';
import Notification from './components/Notification';

import useBlogs from './hooks/useBlogs';
import useNotify from './hooks/useNotify';
import useUser from './hooks/useUser';

const App = () => {
  const { showNotification, hideNotification } = useNotify();
  const { isPending, blogs, createBlog, updateBlog, deleteBlog } = useBlogs();
  const { user, loginUser, logoutUser } = useUser();

  // navigointityökalu
  const navigate = useNavigate();

  // blogin täsmääjä
  const match = useMatch('/blogs/:id');
  const matchedBlog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;

  // apufunktio, joka etsii soveltuvan virheilmoituksen ilmoitusikkunaan
  const displayErrorFromResponse = (response) => {
    const text = response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
    showNotification({ type: 'error', text });
  };

  const handleLogin = async (username, password) => {
    try {
      await loginUser(username, password);
      hideNotification();
      navigate('/');
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const handleLogout = () => {
    logoutUser();
    showNotification('logged out');
    navigate('/');
  };

  const addBlog = async (blog) => {
    try {
      await createBlog(blog);
      showNotification(`new blog '${blog.title}' by ${blog.author} was added`);
      navigate('/');
    } catch ({ response }) {
      displayErrorFromResponse(response);
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
              <Blog blog={matchedBlog} onLike={addLike} onRemove={removeBlog} />
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
