import { useState } from 'react';

import { Header, ConfirmButton } from './shared-styles';
import styled from 'styled-components';

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

const NewBlogForm = ({ onBlogPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddBlog = async (event) => {
    event.preventDefault();
    if (await onBlogPost({ title, author, url })) {
      // tyhjennä kentät vain jos lisäys onnistui
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <>
      <Header>add new blog</Header>
      <Form onSubmit={handleAddBlog}>
        <Label>
          <span>title</span>
          <Input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></Input>
        </Label>
        <Label>
          <span>author</span>
          <Input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></Input>
        </Label>
        <Label>
          <span>url</span>
          <Input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></Input>
        </Label>
        <ConfirmButton type="submit">add</ConfirmButton>
      </Form>
    </>
  );
};

export default NewBlogForm;
