import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../../theme';

import Text from '../Text';

const styles = StyleSheet.create({
  navLink: {
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

const Tab = ({ text, linkTo, onPress }) => {
  return (
    <>
      <Pressable style={styles.navLink} onPress={onPress}>
        {linkTo ? (
          <Link to={linkTo}>
            <Text style={styles.text}>{text}</Text>
          </Link>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Pressable>
    </>
  );
};

export default Tab;
