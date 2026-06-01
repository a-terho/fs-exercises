const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config.js');

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (err) {
    console.log('Failed to connect to the database');
    return process.exit(1);
  }
};

module.exports = { connectDatabase, sequelize };
