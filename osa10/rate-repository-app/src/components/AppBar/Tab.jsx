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
});

const Tab = ({ text, linkTo, onPress }) => {
  return (
    <>
      <Pressable style={styles.navLink} onPress={onPress}>
        {linkTo ? (
          <Link to={linkTo}>
            <Text heading strong color="textLight">
              {text}
            </Text>
          </Link>
        ) : (
          <Text heading strong color="textLight">
            {text}
          </Text>
        )}
      </Pressable>
    </>
  );
};

export default Tab;
