import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme';

import AppBar from './AppBar';
import AddReview from './AddReview';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryList';
import RepositoryPage from './RepositoryPage';
import SignIn from './SignIn';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  app: {
    maxWidth: theme.maxWidth,
    flex: 1, // eli täytä koko näyttötila
  },
});

const Main = () => {
  return (
    <View style={styles.app}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repos/:id" element={<RepositoryPage />} />
        <Route path="/addreview" element={<AddReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
