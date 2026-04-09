import { useState, useEffect, useRef } from 'react';
import './index.css';

import blogService from './services/blogs';
import loginService from './services/login';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';

const Notification = ({ message }) => {
  if (message) return <div className={message.style}>{message.text}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // ilmoitusikkuna
  const [notification, setNotification] = useState(null);

  // viite uutta blogia luovaan React-komponenttiin
  const newBlogFormToggleRef = useRef();

  const setUserIdentityTo = (data) => {
    // data sisältää kentät username, name ja token
    blogService.setToken(data?.token ? data.token : null);
    setUser(data);
  };

  // apufunktio, joka järjestelee blogit tykkäysten mukaan
  const setBlogsSorted = (allBlogs) => {
    setBlogs(allBlogs.sort((a, b) => b.likes - a.likes));
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
      clearNotification();
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUserIdentity');
    setUserIdentityTo(null);
    showInfoNotification('logged out');
  };

  const addBlog = async (data) => {
    try {
      const blog = await blogService.create(data);
      // manipuloidaan paikallista dataa hieman, jotta se sopii frontendiin paremmin
      // tämän voisi tehdä myös muokkaamalla backendista palautuvaa dataa
      blog.user = { username: user.username, name: user.name };
      setBlogs(blogs.concat(blog));

      showInfoNotification(
        `new blog '${blog.title}' by ${blog.author} was added`,
      );

      // piilota komponentti ja välitä sille tieto onnistuneesta lisäyksestä
      newBlogFormToggleRef.current.toggleVisibility();
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
          if (b.id === blog.id) {
            b.likes = res.likes;
          }
          return b;
        }),
      );
    } catch ({ response }) {
      displayErrorFromResponse(response);
    }
  };

  const clearNotification = () => {
    if (notification?.id) clearTimeout(notification.id);
    setNotification(null);
  };

  const showInfoNotification = (text) => {
    clearNotification();

    const id = setTimeout(() => setNotification(null), 4000);
    setNotification({ id, text, style: 'info' });
  };

  const showErrorNotification = (text) => {
    clearNotification();

    const id = setTimeout(() => setNotification(null), 8000);
    setNotification({ id, text, style: 'error' });
  };

  const displayErrorFromResponse = (response) => {
    const message = response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
    showErrorNotification(message);
  };

  return (
    <>
      <Notification message={notification} />
      {user === null && <LoginForm onLogin={handleLogin} />}
      {user && (
        <>
          <h1>blog list app</h1>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Toggleable buttonLabel="create blog" ref={newBlogFormToggleRef}>
            <NewBlogForm onBlogPost={addBlog} />
          </Toggleable>
          <BlogList
            user={user}
            blogs={blogs}
            likeHandler={addLike}
            removeHandler={removeBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
