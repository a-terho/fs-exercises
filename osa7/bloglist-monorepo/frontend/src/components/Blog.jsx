import { useMatch } from 'react-router';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import NotFound from './NotFound';
import { Container, Header, Subheader, Row } from '../styles/shared-styles';
import { Button, LikeButton, RemoveButton } from '../styles/blog-styles';

import useUser from '../hooks/useUser';
import useBlogs from '../hooks/useBlogs';
import useComments from '../hooks/useComments';

const Blog = ({ onLike, onRemove }) => {
  const { isPending, blogs } = useBlogs();
  const { user } = useUser();

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
          {user && <LikeButton onClick={() => onLike(blog)}>like</LikeButton>}
          {userIsBlogCreator && (
            <RemoveButton onClick={() => onRemove(blog)}>remove</RemoveButton>
          )}
        </Row>
        <Subheader>comments</Subheader>
        {user && <CommentForm onCommentPost={addComment} />}
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    </Container>
  );
};

export default Blog;
