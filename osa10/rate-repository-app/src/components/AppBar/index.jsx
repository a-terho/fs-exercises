import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';

import Tab from './Tab';

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgAppBar,
    flexDirection: 'row',
  },
});

const tabs = [{ id: 0, text: 'Repository' }];

const AppBar = () => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <Tab key={tab.id} {...tab} />
      ))}
    </View>
  );
};

export default AppBar;
