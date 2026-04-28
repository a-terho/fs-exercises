const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('node:http');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/use/ws');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createBookCountLoader } = require('./loaders');
const User = require('./models/User');

const getUserFromHeader = async (header) => {
  if (!header.startsWith('Bearer ')) return null;

  const token = header.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(decoded.id);
};

const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Web socket palvelin GraphQL subscription-tukea varten
  const wsServer = new WebSocketServer({ server: httpServer, path: '/' });
  const serverCleanup = useServer({ schema }, wsServer);

  // luo ja käynnistä Apollo Server (HTTP ja WS palvelimet)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();

  // lisää Apollo Server middlewarena Express palvelimen väliin
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // eristä user request headerista kontekstiin
        const header = req.headers.authorization || '';
        const currentUser = await getUserFromHeader(header);
        return {
          currentUser,
          // dataloaderit tulisi ilmeisesti luoda joka kyselyssä uudelleen
          // niin oiva paikka on luoda ne aina uudelleen joka kontekstiin
          loaders: { bookCount: createBookCountLoader() },
        };
      },
    }),
  );

  // käynnistä HTTP palvelin
  httpServer.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
};

module.exports = { startServer };
