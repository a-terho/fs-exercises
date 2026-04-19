import styled from 'styled-components';

const Comment = styled.li`
  list-style-type: '💬';
  font-size: 13pt;
  padding-left: 0.5em;
  margin: 0.5em;
  color: midnightblue;
`;

const CommentList = ({ isLoading, comments }) => {
  if (isLoading) return <p>...</p>;
  if (comments.length === 0) return <p>there are no comments...</p>;

  return (
    <>
      <ul>
        {comments.map((comment) => {
          return <Comment key={comment.id}>{comment.comment}</Comment>;
        })}
      </ul>
    </>
  );
};

export default CommentList;
