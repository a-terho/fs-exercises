'use client';

import { type CSSProperties, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const formStyle: CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
};

const buttonStyle: CSSProperties = {
  alignSelf: 'flex-start',
};

const LoginPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false, // avoid automatic redirections
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        setError('Invalid credentials.');
      } else {
        setError('Unknown error occurred during login.');
      }
    } else {
      router.push('/'); // navigate to /
      router.refresh(); // request updated version from server
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label>
        Username <input name="username" type="text" />
      </label>
      <label>
        Password <input name="password" type="password" />
      </label>
      <button type="submit" style={buttonStyle}>
        Login
      </button>
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
    </form>
  );
};

export default LoginPage;
