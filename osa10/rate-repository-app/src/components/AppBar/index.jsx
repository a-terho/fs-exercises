import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import useAuth from '../../hooks/useAuth';

import Tab from './Tab';

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: Constants.statusBarHeight,
    maxWidth: theme.maxWidth,
    backgroundColor: theme.colors.bgAppBar,
    flexDirection: 'row',
  },
});

const tabs = [{ id: 0, text: 'Repository', linkTo: '/' }];

const AppBar = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal>
        {tabs.map((tab) => (
          <Tab key={tab.id} {...tab} />
        ))}

        {/* erillinen tabi viimeisenä kirjautumista varten */}
        {user ? (
          <Tab text="Sign out" onPress={signOut} />
        ) : (
          <Tab text="Sign in" linkTo="/signIn" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
