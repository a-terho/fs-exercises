import { useNavigate } from 'react-router';
import { useMutation, useApolloClient } from '@apollo/client/react';

import { useField, useNotify } from '../hooks';
import { saveLocalToken } from '../localToken';
import { LOGIN, USER } from '../queries';

const LoginForm = ({ setToken }) => {
  const username = useField('text');
  const password = useField('password');

  const client = useApolloClient();
  const navigate = useNavigate();
  const { notify } = useNotify();

  const [login] = useMutation(LOGIN, {
    onError: (err) => notify(err.message),
    onCompleted: async (data) => {
      // tallenna vastauksena saatu token tilaan ja localStorageen
      const token = data.login.value;
      setToken(token);
      saveLocalToken(token);

      // kirjautumisen yhteydessä päivitetään käyttäjän kyselyn tiedot
      // tämä onCompleted sisällä jotta varmistetaan, että token on tallennettu
      await client.refetchQueries({ include: [{ query: USER }] });

      // siirry etusivulle
      navigate('/');
    },
  });

  const submit = (event) => {
    event.preventDefault();
    login({
      variables: {
        username: username.props.value,
        password: password.props.value,
      },
    });
  };

  return (
    <div>
      <h3>login</h3>
      <form onSubmit={submit}>
        <div>
          <span>username</span>
          <input {...username.props}></input>
        </div>
        <div>
          <span>password</span>
          <input {...password.props}></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
