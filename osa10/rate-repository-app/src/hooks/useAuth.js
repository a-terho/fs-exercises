import { useQuery, useApolloClient } from '@apollo/client/react';
import { ME } from '../graphql/queries';

import useAuthStorage from './useAuthStorage';

const useAuth = () => {
  const { data, error } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  // user on oletusarvoisesti null ellei käyttäjä ole kirjautunut sisään
  const user =
    !error && data?.me && data.me !== null
      ? { id: data.me.id, username: data.me.username }
      : null;

  const signOut = async () => {
    // poista kirjautumistoken storagesta ja nollaa Apollo Client local cache
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return {
    user,
    signOut,
  };
};

export default useAuth;
