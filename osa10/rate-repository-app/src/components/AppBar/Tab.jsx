import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textLight,
  },
});

const Tab = ({ text, link }) => {
  return (
    <>
      <Pressable style={styles.button}>
        <Link to={link}>
          <Text style={styles.text}>{text}</Text>
        </Link>
      </Pressable>
    </>
  );
};

export default Tab;
