import { TextInput, Pressable, View } from 'react-native';
import { Formik, Field } from 'formik';
import styled from 'styled-components/native';
import theme from '../theme';

import Text from './Text';

const Form = styled(View)({
  margin: 20,
  gap: 20,
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

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(form) => (
        <Form>
          <FormInput
            placeholder="Username"
            onChangeText={form.handleChange('username')}
            value={form.values.username}
          />
          <FormInput
            placeholder="Password"
            secureTextEntry
            onChangeText={form.handleChange('password')}
            value={form.values.password}
          />
          <Pressable onPress={form.handleSubmit}>
            <FormButton>Submit</FormButton>
          </Pressable>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
