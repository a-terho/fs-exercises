import { useQuery, useMutation } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const useMyReviews = (variables) => {
  const { loading, data, fetchMore } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables, includeReviews: true },
  });

  let userReviews = [];
  if (data && data.me !== null) {
    const { reviews } = data.me;

    // manipuloidaan arviodata sopivaan muotoon
    userReviews = reviews
      ? reviews.edges.map((edge) => {
          const { __typename, ...review } = edge.node;
          return review;
        })
      : [];
  }

  const [mutation] = useMutation(DELETE_REVIEW, {
    // tekee kyselyn uudelleen automaattisesti mutaation onnistuessa
    refetchQueries: [
      { query: ME, variables: { ...variables, includeReviews: true } },
    ],
  });

  const deleteMyReview = (id) => {
    return mutation({ variables: { id } });
  };

  const fetchMoreReviews = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        ...variables,
        includeReviews: true,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    reviews: userReviews,
    loading,
    deleteMyReview,
    fetchMoreReviews,
  };
};

export default useMyReviews;
