import styled from 'styled-components';
import { Header, ConfirmButton } from './shared-styles';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.3em;
  border-style: none;
  border-bottom-style: solid;
  &:focus {
    outline: none;
  }
`;

import useField from '../hooks/useField';

const LoginForm = ({ onLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username.value, password.value);
    // React nykyisellään poistaa komponentin DOM:sta, jos kirjautuminen
    // onnistuu, lomakkeen kentät nollaantuvat silloin automaattisesti
  };

  return (
    <>
      <Header>login to application</Header>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>username</span> <Input {...username}></Input>
          </label>
        </div>
        <div>
          <label>
            <span>password</span> <Input {...password}></Input>
          </label>
        </div>
        <ConfirmButton type="submit">login</ConfirmButton>
      </form>
    </>
  );
};

export default LoginForm;
