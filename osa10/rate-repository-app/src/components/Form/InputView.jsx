import { View } from 'react-native';
import { FormTextInput, ErrorText } from './styled';

const FormInputView = ({ hasError, errorText, ...props }) => {
  return (
    <View>
      <FormTextInput {...props} error={hasError} />
      {hasError ? <ErrorText>{errorText}</ErrorText> : null}
    </View>
  );
};

export default FormInputView;
