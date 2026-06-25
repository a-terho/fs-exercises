'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useNotification } from '@/app/components/NotificationContext';
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

const LoginPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { showNotification } = useNotification();

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
      showNotification('logged in');
      router.push('/'); // navigate to /
      router.refresh(); // request updated version from server
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={fieldStyle} className="gap-2">
        username <input name="username" type="text" />
      </label>
      <label style={fieldStyle} className="gap-2">
        password <input name="password" type="password" />
      </label>
      <input type="submit" value="login" />
      {error ? (
        <div style={errorStyle}>
          <ErrorMessage text={error} />
        </div>
      ) : null}
    </form>
  );
};

export default LoginPage;
