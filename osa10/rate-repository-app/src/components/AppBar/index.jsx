import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';

import Tab from './Tab';

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: Constants.statusBarHeight,
    maxWidth: theme.maxWidth,
    backgroundColor: theme.colors.bgAppBar,
    flexDirection: 'row',
  },
});

const tabs = [
  { id: 0, text: 'Repository', link: '/' },
  { id: 1, text: 'Sign in', link: '/signin' },
];

const AppBar = () => {
  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal>
        {tabs.map((tab) => (
          <Tab key={tab.id} {...tab} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
