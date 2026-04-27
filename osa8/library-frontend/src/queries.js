import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    authors: allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    books: allBooks {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    author: editAuthor(name: $name, setBornTo: $born) {
      id
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const USER = gql`
  query {
    user: me {
      id
      username
      favoriteGenre
    }
  }
`;
