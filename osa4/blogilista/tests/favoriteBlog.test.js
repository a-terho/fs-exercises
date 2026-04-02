const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const { blogs } = require('./blogs');

describe('favoriteBlog', () => {
  test('return value is in correct format', () => {
    const result = listHelper.favoriteBlog(blogs);

    assert.strictEqual(typeof result._id, 'string', '_id: wrong type');
    assert.strictEqual(typeof result.title, 'string', 'title: wrong type');
    assert.strictEqual(typeof result.author, 'string', 'author: wrong type');
    assert.strictEqual(typeof result.url, 'string', 'url: wrong type');
    assert.strictEqual(typeof result.likes, 'number', 'likes: wrong type');
    assert.strictEqual(typeof result.__v, 'number', '__v: wrong type');
  });

  test('finds the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs);

    const correctOptions = [
      {
        _id: '661a2a009',
        title: 'Node.js Best Practices',
        author: 'GitHub - goldbergyoni',
        url: 'https://github.com/goldbergyoni/nodebestpractices',
        likes: 600,
        __v: 0,
      },
      {
        _id: '661a2a010',
        title: "You Don't Know JS Yet (book series)",
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
        likes: 600,
        __v: 0,
      },
    ];

    const match = correctOptions.some((expected) => {
      try {
        assert.deepStrictEqual(result, expected);
        return true;
      } catch {
        return false;
      }
    });

    assert(
      match,
      `Expected to match one of ${correctOptions.length} options\n` +
        `Got: ${JSON.stringify(result, null, 2)}\n` +
        `Expected one of: ${JSON.stringify(correctOptions, null, 2)}`,
    );
  });
});
