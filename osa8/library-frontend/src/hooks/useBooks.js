import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../queries';

const useBooks = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  // kysely nimeää allBooks -> books, jotta se voidaan destrukturoida
  // jos data ei ole määritetty, destrukturoi muuttujaan tyhjä lista
  const { books } = data || { books: [] };

  return {
    loading,
    error,
    books,
  };
};

export default useBooks;
