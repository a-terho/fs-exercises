require('dotenv').config();

const { startServer } = require('./server');
const { connectToDatabase } = require('./db');

const main = async () => {
  const PORT = process.env.PORT || 4000;
  await connectToDatabase(process.env.MONGODB_URI);
  startServer(PORT);
};

main();
