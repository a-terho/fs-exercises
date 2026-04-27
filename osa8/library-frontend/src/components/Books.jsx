import { useState } from 'react';
import useBooks from '../hooks/useBooks';

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, error, books, allGenres } = useBooks(selectedGenre);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error while loading books</p>;

  return (
    <div>
      <h2>books</h2>

      {selectedGenre !== null ? (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre, index) => (
        <button key={index} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      {allGenres.length > 0 ? (
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      ) : null}
    </div>
  );
};

export default Books;
