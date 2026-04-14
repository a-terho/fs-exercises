import { useState } from 'react';

import { Header, ConfirmButton } from './shared-styles';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.3em;
  border-style: none;
  border-bottom-style: solid;
  &:focus {
    outline: none;
  }
`;

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
      <Header>login to application</Header>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username{' '}
            <Input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            ></Input>
          </label>
        </div>
        <div>
          <label>
            password{' '}
            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></Input>
          </label>
        </div>
        <ConfirmButton type="submit">login</ConfirmButton>
      </form>
    </>
  );
};

export default LoginForm;
