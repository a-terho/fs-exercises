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

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`;

export const ALL_BOOKS = gql`
  query Books($genre: String) {
    books: allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    book: bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
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
