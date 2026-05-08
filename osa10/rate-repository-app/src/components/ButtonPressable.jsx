import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';

import Text from './Text';

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
  },
  submit: {
    backgroundColor: theme.colors.primary,
  },
  cancel: {
    backgroundColor: theme.colors.error,
  },
});

const ButtonPressable = ({ text, type, ...props }) => {
  const style = [
    styles.defaultStyle,
    type === 'submit' && styles.submit,
    type === 'cancel' && styles.cancel,
  ];

  return (
    <Pressable {...props}>
      <Text style={style}>{text}</Text>
    </Pressable>
  );
};

export default ButtonPressable;
