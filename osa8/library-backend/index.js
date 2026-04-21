const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = /* GraphQL */ `
  type Book {
    title: String
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: ({ name }) =>
      books.reduce((sum, book) => (book.author === name ? sum + 1 : sum), 0),
  },

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => authors,

    allBooks: (_, args) => {
      // luo shallow copy kirjakokoelmasta
      let queriedBooks = [...books];

      // filtteröi kokoelmaa tarpeen mukaan soveltuvin osin
      if (args.author)
        queriedBooks = queriedBooks.filter(
          (book) => book.author === args.author,
        );
      if (args.genre)
        queriedBooks = queriedBooks.filter((book) =>
          book.genres.includes(args.genre),
        );

      return queriedBooks;
    },
  },

  Mutation: {
    addBook: (_, { title, author, published, genres }) => {
      // lisää kirja kokoelmaan
      const newBook = { title, author, published, genres, id: uuid() };
      books.push(newBook);

      // lisää tarvittaessa myös kirjailija kokoelmaan
      if (!authors.find((a) => a.name === author)) {
        const newAuthor = { name: author, id: uuid() };
        authors.push(newAuthor);
      }

      return newBook;
    },

    editAuthor: (_, { name, setBornTo }) => {
      // muunna kirjailijakokoelmaa, jos annettu kirjailija löytyy sieltä
      authors = authors.map((author) =>
        author.name === name ? { ...author, born: setBornTo } : author,
      );

      // palauta kirjailija, jos hän löytyy kokoelmasta ja muutoin null
      const author = authors.find((a) => a.name === name);
      return author === undefined ? null : author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
