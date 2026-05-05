import { TextInput, Pressable, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components/native';
import theme from '../theme';

import Text from './Text';

const FormView = styled(View)({
  margin: 20,
  gap: 15,
});

const FormInput = styled(TextInput)({
  padding: 10,
  border: 2,
  borderRadius: 5,
});

const FormButton = styled(Text)({
  backgroundColor: theme.colors.primary,
  color: theme.colors.textLight,
  textAlign: 'center',
  padding: 10,
  borderRadius: 5,
});

const ErrorText = styled(Text)({
  color: theme.colors.error,
  margin: 5,
});

const signInSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signInSchema}
    >
      {(form) => {
        const hasUsernameError = form.errors.username && form.touched.username;
        const hasPasswordError = form.errors.password && form.touched.password;
        const errorFrame = { borderColor: theme.colors.error };
        return (
          <FormView>
            <View>
              <FormInput
                placeholder="Username"
                onChangeText={form.handleChange('username')}
                value={form.values.username}
                style={hasUsernameError ? errorFrame : undefined}
              />
              {hasUsernameError && (
                <ErrorText>{form.errors.username}</ErrorText>
              )}
            </View>
            <View>
              <FormInput
                placeholder="Password"
                secureTextEntry
                onChangeText={form.handleChange('password')}
                value={form.values.password}
                style={hasPasswordError ? errorFrame : undefined}
              />
              {hasPasswordError && (
                <ErrorText>{form.errors.password}</ErrorText>
              )}
            </View>
            <Pressable onPress={form.handleSubmit}>
              <FormButton>Submit</FormButton>
            </Pressable>
          </FormView>
        );
      }}
    </Formik>
  );
};

export default SignIn;
