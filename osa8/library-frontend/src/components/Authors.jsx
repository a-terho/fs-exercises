import { useQuery, useMutation } from '@apollo/client/react';
import { useNotify } from '../hooks';
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries';

import BirthYearForm from './BirthYearForm';

const Authors = ({ token }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const { notify } = useNotify();

  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    onError: (err) => {
      console.error(err);
      notify(`Error: ${err.message}`);
    },
    // mutaatio nimeää editAuthor -> author selkeyttämiseksi
    onCompleted: ({ author }) => {
      // muokkaus ei onnistunut, koska kirjailijaa ei löytynyt
      if (author === null) notify('Error: Author was not found');
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error while loading data</p>;

  // kysely nimeää allAuthors -> authors, jotta se voidaan destrukturoida
  const { authors } = data;

  // pientä validointia client-puolella syötteen suhteen
  const updateBirthYear = (data) => {
    if (data.born === '') return notify('Error: No birth year was given');

    setBirthYear({
      variables: {
        name: data.name,
        born: Number(data.born),
      },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token === null ? null : (
        <BirthYearForm authors={authors} onSend={updateBirthYear} />
      )}
    </div>
  );
};

export default Authors;
