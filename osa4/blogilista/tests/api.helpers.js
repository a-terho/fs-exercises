const config = require('../utils/config');
const jwt = require('jsonwebtoken');

const Blog = require('../models/Blog');
const User = require('../models/User');

function randomElement(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const giveValidRemovedBlogId = async function () {
  const blog = await Blog.create({ title: 'null', url: 'null' });
  await blog.deleteOne();
  return blog.id;
};

const giveValidBlog = async function () {
  const blogs = await Blog.find({});
  return randomElement(blogs);
};

const giveValidBlogId = async function () {
  const blog = await giveValidBlog();
  return blog.id;
};

const giveValidUser = async function () {
  const users = await User.find({});
  return randomElement(users);
};

const giveSomeOtherValidUser = async function (userId) {
  let users = await User.find({});
  users = users.filter((user) => user.id !== userId);
  return randomElement(users);
};

const giveValidJwtToken = async function (user = undefined) {
  // jos käyttäjä annetaan, luo uusi token sen pohjalta
  // muutoin luo token satunnaisesta käyttäjästä
  const someUser = user == undefined ? await giveValidUser() : user;
  const payload = { username: someUser.username, id: someUser.id };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  randomElement,
  giveValidRemovedBlogId,
  giveValidBlog,
  giveValidBlogId,
  giveSomeOtherValidUser,
  giveValidJwtToken,
};
