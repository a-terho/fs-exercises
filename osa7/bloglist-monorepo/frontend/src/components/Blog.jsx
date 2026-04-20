import { useMatch, useNavigate } from 'react-router';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import NotFound from './NotFound';
import { Container, Header, Subheader, Row } from '../styles/shared-styles';
import { Button, LikeButton, RemoveButton } from '../styles/blog-styles';

import useBlogs from '../hooks/useBlogs';
import useComments from '../hooks/useComments';
import useNotify from '../hooks/useNotify';
import useUser from '../hooks/useUser';

const Blog = () => {
  const { isPending, blogs, updateBlog, deleteBlog } = useBlogs();
  const { showNotification } = useNotify();
  const { user } = useUser();

  const navigate = useNavigate();

  // blogin täsmääjä
  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  // hae kommentit täsmätylle blogille
  const { isLoading, comments, addComment } = useComments(blog?.id);

  if (!blog) {
    // älä näytä mitään kun blogit vielä latautuvat
    if (isPending) return null;

    // latautumisen jälkeen jos blogia ei löydy, näytä 404
    return <NotFound element="Blog" />;
  }

  // apufunktio axioksen palauttaman vastausobjektin virheviestin eristämiseksi
  const resolveErrorText = (response) => {
    return response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
  };

  const removeBlog = async (blog) => {
    // varmista poisto käyttäjltä ennen etenemistä
    if (!window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`))
      return;

    try {
      await deleteBlog(blog);
      navigate('/');
    } catch ({ response }) {
      showNotification({ type: 'error', text: resolveErrorText(response) });
    }
  };

  const addLike = async (blog) => {
    try {
      await updateBlog(blog, 'likes', blog.likes + 1);
    } catch ({ response }) {
      showNotification({ type: 'error', text: resolveErrorText(response) });
    }
  };

  const handleAddComment = async (comment) => {
    try {
      await addComment(comment);
    } catch ({ response }) {
      showNotification({ type: 'error', text: resolveErrorText(response) });
    }
  };

  // blogilla ei ole käyttäjää -> undefined, käyttäjä poistettu tietokannasta -> null
  const hasCreator = !(blog.user === undefined || blog.user === null);
  const userIsBlogCreator = user && blog.user?.username === user?.username;

  return (
    <Container className="blog">
      <Header>{blog.title}</Header>
      <div>
        <Row>by {blog.author}</Row>
        <Row>
          <a href={blog.url}>{blog.url}</a>
        </Row>
        {hasCreator && (
          <Row>
            Added by <span>{blog.user.name}</span>
          </Row>
        )}
        <Row>
          likes {blog.likes}{' '}
          {user && <LikeButton onClick={() => addLike(blog)}>like</LikeButton>}
          {userIsBlogCreator && (
            <RemoveButton onClick={() => removeBlog(blog)}>remove</RemoveButton>
          )}
        </Row>
        <Subheader>comments</Subheader>
        {user && <CommentForm onCommentPost={handleAddComment} />}
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    </Container>
  );
};

export default Blog;
