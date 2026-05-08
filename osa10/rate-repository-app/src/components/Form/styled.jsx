import { styled } from 'styled-components/native';
import theme from '../../theme';

import { View } from 'react-native';
import Text from '../Text';
import TextInput from '../TextInput';

export const FormView = styled(View)({
  margin: 20,
  gap: 15,
});

export const FormTextInput = styled(TextInput)((props) => ({
  padding: 10,
  border: 2,
  borderRadius: 5,
  borderColor: props.error ? theme.colors.error : undefined,
}));

export const ErrorText = styled(Text)({
  color: theme.colors.error,
  margin: 5,
});
