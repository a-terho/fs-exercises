const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./models/User');

const getUserFromHeader = async (header) => {
  if (!header.startsWith('Bearer ')) return null;

  const token = header.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(decoded.id);
};

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => {
      // eristä user request headerista kontekstiin
      const header = req.headers.authorization || '';
      const user = await getUserFromHeader(header);
      return { user };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = { startServer };
