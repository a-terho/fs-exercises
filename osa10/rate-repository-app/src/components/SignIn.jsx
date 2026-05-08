import { useState } from 'react';
import { useNavigate } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import ButtonPressable from './shared/ButtonPressable';
import { ErrorText, FormView } from './Form/styled';
import FormInputView from './Form/InputView';

import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  const [error, setError] = useState('');

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (...args) => {
    const error = await onSubmit(...args);
    if (error) setError(error.message);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(form) => {
        const hasUsernameError = form.errors.username && form.touched.username;
        const hasPasswordError = form.errors.password && form.touched.password;
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
              onSubmitEditing={form.handleSubmit}
              value={form.values.password}
              hasError={hasPasswordError}
              errorText={form.errors.password}
            />
            <ButtonPressable
              text="Submit"
              type="submit"
              onPress={form.handleSubmit}
            />
            {error ? <ErrorText>{error}</ErrorText> : null}
          </FormView>
        );
      }}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      return error;
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
