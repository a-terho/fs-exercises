const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

const resolvers = {
  Author: {
    bookCount: async (author) => Book.countDocuments({ author: author.id }),
  },

  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allAuthors: async () => Author.find({}),

    allBooks: async (_, args) => {
      // filtteröi kokoelmaa tarpeen mukaan soveltuvin osin
      const filter = {};
      if (args.author) filter.author = args.author;
      if (args.genre) filter.genres = args.genre;

      // korvaa kirjailijoiden id-viitteet sisällöllä vastaukseen
      return Book.find(filter).populate('author');
    },

    me: (object, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (_, { title, author, published, genres }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Bad authentication, please log in', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      // etsi ensin kirjailijalle oikea id-viite
      let bookAuthor = await Author.findOne({ name: author });

      // lisää tarvittaessa uusi kirjailija kokoelmaan
      // validoi kuitenkin syöte ennen kuin jatketaan
      if (!bookAuthor) {
        try {
          bookAuthor = new Author({ name: author });
          await bookAuthor.validate();
        } catch (err) {
          throw new GraphQLError(`Adding new author failed: ${err.message}`, {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
      }

      // lisää kirja kokoelmaan
      try {
        const newBook = await Book.create({
          title,
          author: bookAuthor._id,
          published,
          genres,
        });
        // kirjan lisäämisen jälkeen tallenna myös jo validoitu kirjailija
        await bookAuthor.save();

        // korvaa lopulliseen vastaukseen kuitenkin id-viite sisällöllä
        return newBook.populate('author');
      } catch (err) {
        throw new GraphQLError(`Adding new book failed: ${err.message}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },

    editAuthor: async (_, { name, setBornTo }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Bad authentication, please log in', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      // etsi kirjailijaa nimeltä kokoelmasta
      const author = await Author.findOne({ name });
      if (!author) return null;

      try {
        // tallenna uudet tiedot ja palauta päivitetty kirjailija
        author.born = setBornTo;
        return author.save();
      } catch (err) {
        throw new GraphQLError(`Editing author failed: ${err.message}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },

    createUser: async (_, { username, favoriteGenre }) => {
      try {
        return await User.create({ username, favoriteGenre });
      } catch (err) {
        throw new GraphQLError(`Creating new user failed: ${err.message}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const payload = { username, id: user.id };
      return { value: jwt.sign(payload, process.env.JWT_SECRET) };
    },

    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode');
      }
      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});
      return true;
    },
  },
};

module.exports = resolvers;
