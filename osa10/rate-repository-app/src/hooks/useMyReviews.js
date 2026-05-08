import { useQuery, useMutation } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const useMyReviews = () => {
  const { loading, data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
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

  const [mutate] = useMutation(DELETE_REVIEW, {
    // tekee kyselyn uudelleen automaattisesti mutaation onnistuessa
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  });

  const deleteMyReview = (id) => {
    return mutate({ variables: { id } });
  };

  return {
    reviews: userReviews,
    loading,
    deleteMyReview,
  };
};

export default useMyReviews;
