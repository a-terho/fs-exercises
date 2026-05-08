import { View, StyleSheet } from 'react-native';
import theme from '../../theme';

import Text from '../shared/Text';

const styles = StyleSheet.create({
  tag: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
});

const Tag = ({ text }) => {
  return (
    <View>
      <Text style={styles.tag}>{text}</Text>
    </View>
  );
};

export default Tag;
