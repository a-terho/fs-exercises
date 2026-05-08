import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import useAuth from '../../hooks/useAuth';

import Tab from './Tab';

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgAppBar,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal>
        <Tab text="Repository" linkTo="/" />
        {user ? (
          <>
            <Tab text="Create a review" linkTo="/addreview" />
            <Tab text="Sign out" linkTo="/" onPress={signOut} />
          </>
        ) : (
          <>
            <Tab text="Sign in" linkTo="/signin" />
            <Tab text="Sign up" linkTo="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
