import { ConfirmButton, Input } from '../styles/shared-styles';

import useField from '../hooks/useField';

const CommentForm = ({ onCommentPost }) => {
  const comment = useField('text');

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (comment.props.value === '') return;

    onCommentPost(comment.props.value);
    comment.reset();
  };

  return (
    <form onSubmit={handleAddComment}>
      <Input {...comment.props}></Input>
      <ConfirmButton type="submit">add comment</ConfirmButton>
    </form>
  );
};

export default CommentForm;
