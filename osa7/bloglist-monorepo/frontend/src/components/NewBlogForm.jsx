import styled from 'styled-components';
import { Header, ConfirmButton } from './shared-styles';

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
      title: title.value,
      author: author.value,
      url: url.value,
    });
    // React nykyisellään poistaa komponentin DOM:sta, jos lisääminen
    // onnistuu, lomakkeen kentät nollaantuvat silloin automaattisesti
  };

  return (
    <>
      <Header>add new blog</Header>
      <Form onSubmit={handleAddBlog}>
        <Label>
          <span>title</span>
          <Input {...title}></Input>
        </Label>
        <Label>
          <span>author</span>
          <Input {...author}></Input>
        </Label>
        <Label>
          <span>url</span>
          <Input {...url}></Input>
        </Label>
        <ConfirmButton type="submit">add</ConfirmButton>
      </Form>
    </>
  );
};

export default NewBlogForm;
