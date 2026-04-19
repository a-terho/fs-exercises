import styled from 'styled-components';
import { Topheader, ConfirmButton } from '../styles/shared-styles';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 10px;

  span {
    text-align: right;
  }
`;

const Input = styled.input`
  padding: 0.5em;
`;

import useField from '../hooks/useField';

const NewBlogForm = ({ onBlogPost }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleAddBlog = (event) => {
    event.preventDefault();
    onBlogPost({
      title: title.props.value,
      author: author.props.value,
      url: url.props.value,
    });
    // React nykyisellään poistaa komponentin DOM:sta, jos lisääminen
    // onnistuu, lomakkeen kentät nollaantuvat silloin automaattisesti
  };

  return (
    <>
      <Topheader>add new blog</Topheader>
      <Form onSubmit={handleAddBlog}>
        <Label>
          <span>title</span>
          <Input {...title.props}></Input>
        </Label>
        <Label>
          <span>author</span>
          <Input {...author.props}></Input>
        </Label>
        <Label>
          <span>url</span>
          <Input {...url.props}></Input>
        </Label>
        <ConfirmButton type="submit">add</ConfirmButton>
      </Form>
    </>
  );
};

export default NewBlogForm;
