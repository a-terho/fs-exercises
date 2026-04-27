import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../queries';

const useBooks = (genre) => {
  const [allGenres, setAllGenres] = useState([]);

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    // ei kelpuuteta falsy arvoja genreiksi ("", false, null jne)
    variables: !genre ? {} : { genre },
  });

  useEffect(() => {
    // kysely nimeää vastaukseen allBooks -> books
    // kaikki genret voidaan laskea vain kun kysely kohdistuu kaikkiin kirjoihin eli
    // kun genreä ei ole annettu, päivitetään genrelista vain kyseisen kyselyn yhteydessä
    if (data?.books && !genre) {
      // lasketaan uniikit genret kirjalistasta
      const genres = [...new Set(data.books.flatMap((book) => book.genres))];
      setAllGenres(genres);
    }
  }, [data, genre]);

  // jos data ei ole määritetty, destrukturoi muuttujaan tyhjä lista
  const { books } = data || { books: [] };

  return {
    loading,
    error,
    books,
    allGenres,
  };
};

export default useBooks;
