import { useState } from 'react';
import { useNavigate } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { ErrorText, FormView } from './Form/styled';
import FormInputView from './Form/InputView';
import SubmitPressable from './Form/SubmitPressable';

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username can be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password can be at most 50 characters long')
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [error, setError] = useState('');
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    confirm: '',
  };

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(form) => {
        const hasUsernameError = form.errors.username && form.touched.username;
        const hasPasswordError = form.errors.password && form.touched.password;
        const hasConfirmError = form.errors.confirm && form.touched.confirm;

        return (
          <FormView>
            <FormInputView
              placeholder="Username"
              onChangeText={form.handleChange('username')}
              value={form.values.username}
              hasError={hasUsernameError}
              errorText={form.errors.username}
            />
            <FormInputView
              placeholder="Password"
              secureTextEntry
              onChangeText={form.handleChange('password')}
              value={form.values.password}
              hasError={hasPasswordError}
              errorText={form.errors.password}
            />
            <FormInputView
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={form.handleChange('confirm')}
              value={form.values.confirm}
              hasError={hasConfirmError}
              errorText={form.errors.confirm}
            />
            <SubmitPressable
              text="Create account and sign in"
              onPress={form.handleSubmit}
            />
            {error ? <ErrorText>{error}</ErrorText> : null}
          </FormView>
        );
      }}
    </Formik>
  );
};

export default SignUp;
