import { Pressable } from 'react-native';
import { SubmitButtonText } from './styled';

const SubmitPressable = ({ text, ...props }) => {
  return (
    <Pressable {...props}>
      <SubmitButtonText>{text}</SubmitButtonText>
    </Pressable>
  );
};

export default SubmitPressable;
