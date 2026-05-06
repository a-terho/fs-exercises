import { useMutation, useApolloClient } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';

import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutation, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutation({ variables: { username, password } });

    // mutaatio heittää virheen epäonnistuessaan eli tänne
    // asti päästään vain jos kirjautuminen onnistui

    // tallenna accessToken storageen
    const accessToken = response.data.authenticate.accessToken;
    await authStorage.setAccessToken(accessToken);

    // nollaa Apollo Client local cache
    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
