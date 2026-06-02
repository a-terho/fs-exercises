const app = require('./app.js');
const { connectDatabase } = require('./util/db.js');
const { PORT } = require('./util/config.js');

const main = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
};

main();
