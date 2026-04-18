const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const { blogs, blogsMany } = require('./data');

describe('mostBlogs', () => {
  test('return value is in correct format', () => {
    const result = listHelper.mostBlogs(blogs);

    assert.strictEqual(typeof result.author, 'string', 'author: wrong type');
    assert.strictEqual(typeof result.blogs, 'number', 'blogs: wrong type');
  });

  // dataset 1
  test('dataset 1 - finds the writer with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);

    const correctOptions = ['MDN Web Docs', 'freeCodeCamp'];
    assert(correctOptions.includes(result.author));
  });

  test('dataset 1 - finds the correct amount blogs', () => {
    const result = listHelper.mostBlogs(blogs);

    assert.strictEqual(result.blogs, 2);
  });

  // dataset 2
  test('dataset 2 - finds the writer with most blogs', () => {
    const result = listHelper.mostBlogs(blogsMany);

    assert.strictEqual(result.author, 'Robert C. Martin');
  });

  test('dataset 2 - finds the correct amount blogs', () => {
    const result = listHelper.mostBlogs(blogsMany);

    assert.strictEqual(result.blogs, 3);
  });
});
