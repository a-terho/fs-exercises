import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  // .env tiedosto rate-repository-app juuressa, jossa muuttuja määritetty
  // tämän voisi tarpeen mukaan edelleen siistiä jos menisi produktioon
  uri: `http://${process.env.EXPO_PUBLIC_HOST_LAN_IP}:4000/graphql`,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
