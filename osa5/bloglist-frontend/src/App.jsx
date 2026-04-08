import { useState, useEffect } from 'react';
import './index.css';

import blogService from './services/blogs';
import loginService from './services/login';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';

const Notification = ({ message }) => {
  if (message) return <div className={message.style}>{message.text}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // ilmoitusikkuna
  const [notification, setNotification] = useState(null);
  // kirjautumislomake
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // blogin lisäämisen lomake
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const setUserIdentityTo = (data) => {
    // data sisältää kentät username ja token
    blogService.setToken(data?.token ? data.token : null);
    setUser(data);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const jsonData = window.localStorage.getItem('blogAppUserIdentity');
    if (jsonData) {
      const data = JSON.parse(jsonData);
      setUserIdentityTo(data);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginService.login(username, password);
      window.localStorage.setItem('blogAppUserIdentity', JSON.stringify(data));
      setUserIdentityTo(data);
      clearNotification();
    } catch ({ response }) {
      showErrorNotification(response.data.error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUserIdentity');
    setUserIdentityTo(null);
    showInfoNotification('logged out');
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url });
      // ei toimi tällä hetkellä kuten toivottu
      // user kenttää ei populoida vastaukseen eikä käyttäjän id:tä ole saatavilla suoraan
      //  joten blogi ei tunnistaudu oikealle käyttäjälle vaikka se lisättäisiinkin tilaan
      //  eikä näy siten listauksessa, vaatii hiemam backendin muokkaamista
      // setBlogs(blogs.concat(blog));

      showInfoNotification(`new blog '${title}' by ${author} was added`);
    } catch ({ response }) {
      showErrorNotification(response.data.error);
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

  return (
    <>
      <Notification message={notification} />
      {user === null && (
        <LoginForm
          onUsernameChange={({ target }) => setUsername(target.value)}
          onPasswordChange={({ target }) => setPassword(target.value)}
          onSubmit={handleLogin}
        />
      )}
      {user && (
        <>
          <h1>blog list app</h1>
          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <NewBlogForm
            onTitleChange={({ target }) => setTitle(target.value)}
            onAuthorChange={({ target }) => setAuthor(target.value)}
            onUrlChange={({ target }) => setUrl(target.value)}
            onSubmit={handleAddBlog}
          />
          <BlogList user={user} blogs={blogs} />
        </>
      )}
    </>
  );
};

export default App;
