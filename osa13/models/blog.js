const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db.js');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isValidYear(year) {
          const currentYear = new Date().getFullYear();
          if (year < 1991 || year > currentYear) {
            throw new Error(`year must be between 1991 and ${currentYear}`);
          }
        },
      },
    },
  },
  { sequelize, modelName: 'blog' },
);

module.exports = Blog;
