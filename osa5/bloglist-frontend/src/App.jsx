import './index.css';

import { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, useNavigate, useMatch } from 'react-router';

import blogService from './services/blogs';
import loginService from './services/login';

import Notification from './components/Notification';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';

import NewBlogForm from './components/NewBlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // viite ilmoitusikkunan metodeja varten
  const notificationRef = useRef();

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

  // apufunktio, joka järjestelee blogit tykkäysten mukaan
  const setBlogsSorted = (allBlogs) => {
    setBlogs(allBlogs.sort((a, b) => b.likes - a.likes));
  };

  // apufunktio, joka etsii soveltuvan virheilmoituksen ilmoitusikkunaan
  const displayErrorFromResponse = (response) => {
    const message = response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
    notificationRef.current.showError(message);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogsSorted(blogs));
  }, []);

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
      notificationRef.current.hide();
      navigate('/');
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUserIdentity');
    setUserIdentityTo(null);
    notificationRef.current.showInfo('logged out');
  };

  const addBlog = async (data) => {
    try {
      const blog = await blogService.create(data);
      // manipuloidaan paikallista dataa hieman, jotta se sopii frontendiin paremmin
      // tämän voisi tehdä myös muokkaamalla backendista palautuvaa dataa
      blog.user = { username: user.username, name: user.name };
      setBlogs(blogs.concat(blog));

      notificationRef.current.showInfo(
        `new blog '${blog.title}' by ${blog.author} was added`,
      );

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
      await blogService.remove(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      navigate('/');
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const addLike = async (blog) => {
    try {
      const res = await blogService.updateField(blog, 'likes', blog.likes + 1);

      // onnistuessaan päivitetään blogs listaan myös palvelimen mukainen tieto
      setBlogsSorted(
        blogs.map((b) => {
          if (b.id === blog.id) b.likes = res.likes;
          return b;
        }),
      );
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">blogs</Link>
        {user === null && <Link to="/login">login</Link>}
        {user && (
          <>
            <Link to="/create">new blog</Link>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>
      <Notification ref={notificationRef} />
      <Routes>
        {/* navbarin linkit */}
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/create" element={<NewBlogForm onBlogPost={addBlog} />} />

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
      </Routes>
    </>
  );
};

export default App;
