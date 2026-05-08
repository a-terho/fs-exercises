import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from '../shared/Text';

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
    <Link to={linkTo} style={styles.navLink} onPress={onPress}>
      <Text heading strong color="textLight">
        {text}
      </Text>
    </Link>
  );
};

export default Tab;
