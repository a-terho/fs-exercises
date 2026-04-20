import { useNavigate } from 'react-router';
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

import useBlogs from '../hooks/useBlogs';
import useField from '../hooks/useField';
import useNotify from '../hooks/useNotify';

const NewBlogForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const { createBlog } = useBlogs();
  const { showNotification } = useNotify();

  const navigate = useNavigate();

  // apufunktio axioksen palauttaman vastausobjektin virheviestin eristämiseksi
  const resolveErrorText = (response) => {
    return response.data?.error
      ? response.data.error
      : `${response.statusText} (${response.status})`;
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title: title.props.value,
      author: author.props.value,
      url: url.props.value,
    };

    try {
      await createBlog(blog);
      showNotification(`new blog '${blog.title}' by ${blog.author} was added`);
      navigate('/');
      // React nykyisellään poistaa komponentin DOM:sta, jos lisääminen
      // onnistuu, lomakkeen kentät nollaantuvat silloin automaattisesti
    } catch ({ response }) {
      showNotification({ type: 'error', text: resolveErrorText(response) });
    }
  };

  return (
    <>
      <Topheader>add new blog</Topheader>
      <Form onSubmit={addBlog}>
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
