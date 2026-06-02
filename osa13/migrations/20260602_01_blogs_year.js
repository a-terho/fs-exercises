const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('blogs', 'year');
};

module.exports = { up, down };
