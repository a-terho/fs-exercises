import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  // .env tiedosto rate-repository-app juuressa, jossa muuttuja määritetty
  // tämän voisi tarpeen mukaan edelleen siistiä jos menisi produktioon
  uri: `http://${process.env.EXPO_PUBLIC_HOST_LAN_IP}:4000/graphql`,
});

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async ({ headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (err) {
      console.log(err);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
