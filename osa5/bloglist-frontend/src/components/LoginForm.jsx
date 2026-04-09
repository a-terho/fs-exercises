import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username, password);
    // React nykyisellään poistaa komponentin DOM:sta, jos kirjautuminen
    // onnistuu, username and password nollaantuu silloin automaattisesti
  };

  return (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username{' '}
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            password{' '}
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
