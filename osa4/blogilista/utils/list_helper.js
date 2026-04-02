const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes === undefined || blog.likes > favorite.likes) {
      return blog;
    } else {
      return favorite;
    }
  }, {});
};

const mostBlogs = (blogs) => {
  const [author, count] = _.chain(blogs)
    .countBy('author') // -> { 'author': num }
    .toPairs() // -> ['author', num]
    .maxBy(([, num]) => num)
    .value();

  return { author, blogs: count };
};

const mostLikes = (blogs) => {
  const result = _.chain(blogs)
    .groupBy('author') // -> { 'author1': [{}, {}], 'author2': [{}, {}], ... }
    .map((authorBlogs, author) => {
      const authorTotalLikes = authorBlogs.reduce(
        (sum, authorBlog) => sum + authorBlog.likes,
        0,
      );
      return { author, likes: authorTotalLikes };
    }) // -> [{ author: 'author1', likes: ... }, { author: 'author2', likes: ... }, .... ]
    .maxBy('likes') // -> { author: 'author1', likes: ... }
    .value();

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
