'use client';

import { type CSSProperties, useActionState } from 'react';
import { registerUser } from '@/app/actions/users';
import { RegisterFormState } from '@/types';
import ErrorMessage from '@/app/components/ErrorMessage';

const formStyle: CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
};

const buttonStyle: CSSProperties = {
  alignSelf: 'flex-start',
};

const initialState: RegisterFormState = {
  errors: {},
  values: {
    username: '',
    name: '',
    password: '',
    passwordConfirm: '',
  },
};

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} style={formStyle}>
      <label>
        Username{' '}
        <input
          name="username"
          type="text"
          defaultValue={state.values.username}
        />
      </label>
      <ErrorMessage text={state.errors?.username} />
      <label>
        Name <input name="name" type="text" defaultValue={state.values.name} />
      </label>
      <ErrorMessage text={state.errors?.name} />
      <label>
        Password{' '}
        <input
          name="password"
          type="password"
          defaultValue={state.values.password}
        />
      </label>
      <label>
        Confirm password{' '}
        <input
          name="password-confirm"
          type="password"
          defaultValue={state.values.passwordConfirm}
        />
      </label>
      <ErrorMessage text={state.errors?.password} />
      <button type="submit" style={buttonStyle}>
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
