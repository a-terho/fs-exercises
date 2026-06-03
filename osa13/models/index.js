const Blog = require('./blog.js');
const User = require('./user.js');
const Readinglist = require('./readinglist.js');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' });
Blog.belongsToMany(User, { through: Readinglist });

// poistettu käytöstä migraatioiden vuoksi
// User.sync({ alter: true });
// Blog.sync({ alter: true });

const reset = async () => {
  await Blog.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
  console.log('Database tables for blogs and users were reset');
};

module.exports = { Blog, User, reset };
