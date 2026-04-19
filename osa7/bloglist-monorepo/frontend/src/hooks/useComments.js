import { useQuery, useQueryClient } from '@tanstack/react-query';

import blogService from '../services/blogs';

const useComments = (blogId) => {
  const queryClient = useQueryClient();

  // hae kommentit vain kun blogId on määritetty
  const { isPending, data } = useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => blogService.getComments(blogId),
    enabled: !!blogId, // muuta boolean-muotoon
  });

  // lisää kommentti ja päivitä kommentit serverin tilan mukaiseksi
  const addComment = async (comment) => {
    const data = await blogService.addComment(blogId, comment);
    queryClient.setQueryData(['comments', blogId], data);
  };

  return {
    isLoading: isPending,
    comments: data ? data.comments : [],
    addComment,
  };
};

export default useComments;
