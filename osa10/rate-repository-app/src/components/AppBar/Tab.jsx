import { Pressable, StyleSheet, Text } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontSize: theme.fontSizes.appBar,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textAppBar,
  },
});

const Tab = ({ text }) => {
  return (
    <>
      <Pressable style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </>
  );
};

export default Tab;
