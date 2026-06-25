'use server';

import { redirect } from 'next/navigation';
import { addUser, getUserByUsername } from '@/app/services/users';
import type { RegisterFormErrors, RegisterFormState } from '@/types';

export const registerUser = async (
  _prevState: RegisterFormState,
  formData: FormData,
) => {
  const errors: RegisterFormErrors = {};

  const username = (formData.get('username') as string)?.trim();
  if (!username || username.length < 4) {
    errors.username = 'Username must be at least 4 characters!';
  }

  const name = (formData.get('name') as string)?.trim();
  if (!name) {
    errors.name = 'Name is required!';
  }

  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('password-confirm') as string;
  if (!password || password.length < 4) {
    errors.password = 'Password must be at least 4 characters long!';
  } else if (!(password && passwordConfirm) || password !== passwordConfirm) {
    errors.password = 'Passwords must match!';
  }

  // display input error messages to the client if there were any
  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } };
  }

  // use a seperate check here to avoid unnecessary db queries on invalid input
  const user = await getUserByUsername(username);
  if (user) {
    errors.username = 'That username is already taken!';
    return { errors, values: { username, name, password, passwordConfirm } };
  }

  await addUser(username, name, password);
  return redirect('/login');
};
