'use client';

import { type CSSProperties, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const formStyle: CSSProperties = {
  margin: '10px',
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
      redirect: false, // avoid throwing redirection error
    });

    console.log(result);

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
      <button style={buttonStyle}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
