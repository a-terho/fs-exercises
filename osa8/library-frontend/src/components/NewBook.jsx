import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useField, useNotify } from '../hooks';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const NewBook = () => {
  const title = useField('text');
  const author = useField('text');
  const published = useField('number');
  const genre = useField('text');

  const [genres, setGenres] = useState([]);
  const { notify } = useNotify();

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (err) => {
      console.error(err);
      notify(`Error: ${err.message}`);
    },
    // tee kyselyt palvelimelle uudelleen mutaation myötä
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    // pientä validointia client-puolella syötteen suhteen
    if (
      title.props.value === '' ||
      author.props.value === '' ||
      published.props.value === ''
    )
      return notify('Error: Some input is required');

    // luo uusi kirja ja välitä se muuttujiksi mutaatiolle
    const newBook = {
      title: title.props.value,
      author: author.props.value,
      published: Number(published.props.value),
      genres,
    };
    addBook({ variables: newBook });

    // tyhjää kentät
    title.reset();
    author.reset();
    published.reset();
    genre.reset();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.props.value));
    genre.reset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title.props} />
        </div>
        <div>
          author
          <input {...author.props} />
        </div>
        <div>
          published
          <input {...published.props} />
        </div>
        <div>
          <input {...genre.props} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
