import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  const repositories = data?.repositories;

  return { repositories, loading, error, refetch };
};

export default useRepositories;
