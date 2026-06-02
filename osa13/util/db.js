const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const { DATABASE_URL } = require('./config.js');

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const umzugConfig = {
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(umzugConfig);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((file) => file.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(umzugConfig);
  await migrator.down();
};

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to the database');
  } catch (err) {
    console.log('Failed to connect to the database');
    return process.exit(1);
  }
};

module.exports = { sequelize, rollbackMigration, connectDatabase };
