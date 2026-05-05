import { View, StyleSheet } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
  stat: {
    padding: 4,
    alignItems: 'center', // oletuksena flexDirection: 'column'
    flexGrow: 1,
  },
});

const Stat = ({ number, label }) => {
  return (
    <View style={styles.stat}>
      <Text strong subheading>
        {number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number}
      </Text>
      <Text subheading color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

export default Stat;
