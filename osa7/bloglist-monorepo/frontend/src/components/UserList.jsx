import { Link } from 'react-router';
import styled from 'styled-components';

import { Topheader } from '../styles/shared-styles';

const Table = styled.table`
  font-family: Helvetica, sans-serif;
  table-layout: fixed;
  /* border-collapse: collapse; */
  width: 600px;
`;

const Cell = styled.td`
  border: rgba(50, 50, 50, 0.1) solid;
  padding: 0.5em;
  text-align: center;
`;

import useUsers from '../hooks/useUsers';

const UserList = () => {
  const { isPending, users } = useUsers();

  if (isPending) return <p>loading...</p>;

  return (
    <>
      <Topheader>users</Topheader>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <Cell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Cell>
                <Cell>{user.username}</Cell>
                <Cell>{user.blogs.length}</Cell>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
