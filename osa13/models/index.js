const Blog = require('./blog.js');
const User = require('./user.js');

User.hasMany(Blog);
Blog.belongsTo(User);

// Blog.sync({ alter: true });
// User.sync({ alter: true });
Blog.sync();
User.sync();

const reset = async () => {
  await Blog.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
  console.log('Database tables for blogs and users were reset');
};

module.exports = { Blog, User, reset };
