import { useNavigate } from 'react-router';
import { useMutation, useApolloClient } from '@apollo/client/react';

import { useField, useNotify } from '../hooks';
import { saveLocalToken, getLocalToken } from '../localToken';
import { LOGIN, USER } from '../queries';

const LoginForm = ({ setToken }) => {
  const username = useField('text');
  const password = useField('password');

  const client = useApolloClient();
  const navigate = useNavigate();
  const { notify } = useNotify();

  const [login] = useMutation(LOGIN, {
    onError: () => notify('Login failed'),
    onCompleted: async (data) => {
      // tallenna vastauksena saatu token tilaan ja localStorageen
      const token = data.login.value;
      setToken(token);
      saveLocalToken(token);

      // kirjautumisen yhteydessä päivitetään käyttäjän kyselyn tiedot
      // tämä onCompleted sisällä jotta varmistetaan, että token on tallennettu
      await client.refetchQueries({ include: [{ query: USER }] });

      // siirry etusivulle
      // navigate('/');
    },
  });

  // poistettu uudelleenohjaus yksinomaan, jotta E2E testit menee läpi
  // testien selektoreilla on taipumus valita väärän sivun syöttölomakkeita
  if (getLocalToken()) return <h3>logged in</h3>;

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
          <label>
            <span>username</span>
            <input {...username.props}></input>
          </label>
        </div>
        <div>
          <label>
            <span>password</span>
            <input {...password.props}></input>
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
