import { useQuery, useQueryClient } from '@tanstack/react-query';

import blogService from '../services/blogs';

const useBlogs = () => {
  const queryClient = useQueryClient();

  // apufunktio blogien järjestämiseen
  const byLikes = (a, b) => b.likes - a.likes;

  const { isPending, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnMount: false, // älä hae uudelleen, kun blogi avataan
  });
  const blogs = data ? data.toSorted(byLikes) : [];

  // kokeilin mutaatioiden lisäämistä tähän, mutta se näytti lähinnä
  // lisäävän kompleksiteettia ilman merkittävää muuta lisähyötyä

  const createBlog = async (data) => {
    const blog = await blogService.create(data);

    // lisää blogi myös nykyisen listan häntäpäähän
    queryClient.setQueryData(['blogs'], blogs.concat(blog));
  };

  const updateBlog = async (blog, field, value) => {
    const res = await blogService.updateField(blog.id, field, value);

    // onnistuessaan päivitetään blogilistaan myös palvelimen mukainen tieto
    queryClient.setQueryData(
      ['blogs'],
      blogs
        .map((b) => (b.id === blog.id ? { ...b, [field]: res[field] } : b))
        .toSorted(byLikes),
    );
  };

  const deleteBlog = async (blog) => {
    await blogService.remove(blog.id);
    queryClient.setQueryData(
      ['blogs'],
      blogs.filter((b) => b.id !== blog.id),
    );
  };

  return {
    isPending,
    blogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogs;
