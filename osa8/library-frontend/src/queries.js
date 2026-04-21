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
      author
      published
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
      author
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
