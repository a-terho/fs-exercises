import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  let repositoryData = undefined;
  let repositoryReviews = [];

  if (data && data.repository) {
    const { reviews, ...rest } = data.repository;
    repositoryData = rest;

    // manipuloidaan arviodata sopivaan muotoon
    repositoryReviews = reviews
      ? reviews.edges.map((edge) => {
          const { __typename, ...review } = edge.node;
          return review;
        })
      : [];
  }

  const fetchMoreReviews = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        ...variables,
        afterReview: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: repositoryData,
    reviews: repositoryReviews,
    fetchMoreReviews,
  };
};

export default useRepository;
