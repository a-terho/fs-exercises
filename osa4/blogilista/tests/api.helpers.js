const Blog = require('../models/Blog');

const giveValidRemovedBlogId = async function () {
  const blog = await Blog.create({ title: 'null', url: 'null' });
  await blog.deleteOne();
  return blog.id.toString();
};

const giveValidBlogId = async function () {
  const blogs = await Blog.find({});
  const blog = blogs[0];
  return blog.id.toString();
};

module.exports = { giveValidRemovedBlogId, giveValidBlogId };
