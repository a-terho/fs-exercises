import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';

import Main from './src/components/Main';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import AuthStorage from './src/utils/authStorage';
import createApolloClient from './src/utils/apolloClient';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext value={authStorage}>
            <Main />
          </AuthStorageContext>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
