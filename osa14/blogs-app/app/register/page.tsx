import { type CSSProperties } from 'react';
import { registerUser } from '@/app/actions/users';

const formStyle: CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
};

const buttonStyle: CSSProperties = {
  alignSelf: 'flex-start',
};

const RegisterPage = () => {
  return (
    <form action={registerUser} style={formStyle}>
      <label>
        Username <input name="username" type="text" />
      </label>
      <label>
        Name <input name="name" type="text" />
      </label>
      <label>
        Password <input name="password" type="password" />
      </label>
      <button type="submit" style={buttonStyle}>
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
