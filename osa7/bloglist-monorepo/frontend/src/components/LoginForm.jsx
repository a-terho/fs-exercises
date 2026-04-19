import { Topheader, ConfirmButton, Input } from '../styles/shared-styles';

import useField from '../hooks/useField';

const LoginForm = ({ onLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username.props.value, password.props.value);
    // React nykyisellään poistaa komponentin DOM:sta, jos kirjautuminen
    // onnistuu, lomakkeen kentät nollaantuvat silloin automaattisesti
  };

  return (
    <>
      <Topheader>login to application</Topheader>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>username</span> <Input {...username.props}></Input>
          </label>
        </div>
        <div>
          <label>
            <span>password</span> <Input {...password.props}></Input>
          </label>
        </div>
        <ConfirmButton type="submit">login</ConfirmButton>
      </form>
    </>
  );
};

export default LoginForm;
