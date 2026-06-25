'use client';

import { useActionState } from 'react';
import { registerUser } from '@/app/actions/users';
import { RegisterFormState } from '@/types';
import ErrorMessage from '@/app/components/ErrorMessage';

const formStyle: React.CSSProperties = {
  display: 'inline-grid',
  gridTemplateColumns: 'max-content 1fr',
};

const fieldStyle: React.CSSProperties = {
  display: 'grid',
  gridColumn: '-1 / 1',
  gridTemplateColumns: 'subgrid',
};

const errorStyle: React.CSSProperties = {
  gridColumn: '-1 / 1',
  width: 0,
  minWidth: '100%',
  whiteSpace: 'nowrap',
  textAlign: 'center',
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
      <label style={fieldStyle} className="gap-2">
        username{' '}
        <input
          name="username"
          type="text"
          defaultValue={state.values.username}
        />
      </label>
      <div style={errorStyle}>
        <ErrorMessage text={state.errors?.username} />
      </div>
      <label style={fieldStyle} className="gap-2">
        name <input name="name" type="text" defaultValue={state.values.name} />
      </label>
      <div style={errorStyle}>
        <ErrorMessage text={state.errors?.name} />
      </div>
      <label style={fieldStyle} className="gap-2">
        password{' '}
        <input
          name="password"
          type="password"
          defaultValue={state.values.password}
        />
      </label>
      <label style={fieldStyle} className="gap-2">
        confirm password{' '}
        <input
          name="password-confirm"
          type="password"
          defaultValue={state.values.passwordConfirm}
        />
      </label>
      <div style={errorStyle}>
        <ErrorMessage text={state.errors?.password} />
      </div>
      <input type="submit" value="register" />
    </form>
  );
};

export default RegisterPage;
