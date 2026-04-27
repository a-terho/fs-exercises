import { useState } from 'react';
import useBooks from '../hooks/useBooks';

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, error, books } = useBooks();

  // lasketaan uniikit genret joka renderin yhteydessä kirjalistasta
  // tämän voisi toteuttaa memoisaation avulla jos aiheuttaisi kuormaa
  const genres = [...new Set(books.flatMap((book) => book.genres))];

  if (loading) return <p>loading...</p>;
  if (error) return <p>error while loading data</p>;

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
          {books.map((book) => {
            // jos jokin genre on valittu, näytä kirja vain jos se on tässä
            // genressä, ja jos genreä ei ole valittu, näytä kirja aina
            return selectedGenre !== null &&
              !book.genres.includes(selectedGenre) ? null : (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {genres.map((genre, index) => (
        <button key={index} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      {genres.length > 0 ? (
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      ) : null}
    </div>
  );
};

export default Books;
