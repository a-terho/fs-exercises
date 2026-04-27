import { useQuery } from '@apollo/client/react';
import { USER } from '../queries';

import useBooks from '../hooks/useBooks';

const Recommendations = () => {
  const { loading, error, data } = useQuery(USER);
  const { books } = useBooks();

  if (loading) return <p>loading...</p>;
  if (error) return <p>error while user data</p>;

  // kysely nimeää me -> user, jotta se voidaan destrukturoida näin
  // jos data ei ole määritetty, destrukturoi muuttujaan null
  const { user } = data || { user: null };

  // käyttäjä on null, kun hän ei ole kirjautunut tai käyttäjää ei ole olemassa
  if (user === null) return <p>please log in</p>;

  // seulo käyttäjän suosikkigenren kirjat
  const favoriteGenreBooks = books.filter((book) =>
    book.genres.includes(user.favoriteGenre),
  );

  return (
    <>
      <h2>recommendations</h2>
      {favoriteGenreBooks.length == 0 ? (
        <p>
          there are currently no recommendations for your favorite genre{' '}
          <strong>{user.favoriteGenre}</strong>
        </p>
      ) : (
        <>
          <p>
            books in your favorite genre <strong>{user.favoriteGenre}</strong>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {favoriteGenreBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Recommendations;
