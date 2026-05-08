import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const useAddReview = () => {
  const [mutation, result] = useMutation(CREATE_REVIEW);

  const addReview = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutation({
      variables: { ownerName, repositoryName, rating: Number(rating), text },
    });

    // palauta vain luodun repositoryn id tässä vaiheessa
    const id = response.data.createReview.repositoryId;
    return id;
  };

  return [addReview, result];
};

export default useAddReview;
