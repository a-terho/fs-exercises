const assert = require('node:assert');
const { test, describe, beforeEach, after } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const api = supertest(app);

const { blogsMany } = require('./blogs');
const { giveValidRemovedBlogId, giveValidBlogId } = require('./api.helpers');
const Blog = require('../models/Blog');

// testitietokannan valmistelu
beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(blogsMany);
});

describe('route /api/blogs', () => {
  describe('GET', () => {
    test('responds with json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('returns correct number of blogs', async () => {
      const blogs = await Blog.find({});
      const res = await api.get('/api/blogs');
      assert.strictEqual(blogs.length, res?.body?.length);
    });

    test('returns id field in correct format', async () => {
      const res = await api.get('/api/blogs');

      for (let blog of res?.body) {
        assert.strictEqual(
          typeof blog?.id,
          'string',
          `wrong type for id, expected string, got ${typeof blog?.id}`,
        );
        assert.strictEqual(
          typeof blog?._id,
          'undefined',
          '_id field is not removed from the response',
        );
      }
    });
  });

  describe('POST', () => {
    test('adds new blog from a valid post', async () => {
      const newBlog = {
        title: "You Don't Know JS Yet (book series)",
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfter = await Blog.find({});
      assert.strictEqual(
        blogsAfter.length,
        blogsMany.length + 1,
        'number of blogs did not increase in database',
      );

      const found = blogsAfter.some(
        (blog) =>
          blog.title === newBlog.title &&
          blog.author === newBlog.author &&
          blog.url === newBlog.url,
      );
      assert(found, 'a blog with valid values was not added to database');
    });

    test('sends bad request (400) for invalid payload', async () => {
      // lähetä tyhjä json payload
      await api.post('/api/blogs').send({}).expect(400);

      // lähetä json ilman title kenttää
      let badPost = {
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
      };
      await api.post('/api/blogs').send(badPost).expect(400);

      // lähetä json ilman url kenttää
      badPost = {
        title: "You Don't Know JS Yet (book series)",
        author: 'Kyle Simpson',
      };
      await api.post('/api/blogs').send(badPost).expect(400);
    });
  });
});

describe('route /api/blogs/:id', () => {
  describe('DELETE', () => {
    test('removes a blog from database', async () => {
      const goodId = await giveValidBlogId();
      await api.delete(`/api/blogs/${goodId}`).expect(204);

      const blogsAfter = await Blog.find({});
      assert.strictEqual(blogsAfter.length, blogsMany.length - 1);
    });

    test('sends not found (404) for valid, non-existent id', async () => {
      const badId = await giveValidRemovedBlogId();
      await api.delete(`/api/blogs/${badId}`).expect(404);
    });

    test('sends bad request (400) for invalid id', async () => {
      const badId = '5a42h3xh45n0xes4df7';
      await api.delete(`/api/blogs/${badId}`).expect(400);
    });
  });

  describe('PATCH', () => {
    test("updates blog's likes correctly", async () => {
      const goodId = await giveValidBlogId();
      await api.patch(`/api/blogs/${goodId}`).send({ likes: 30 }).expect(200);

      const blogAfter = await Blog.findById(goodId);
      assert.strictEqual(blogAfter.likes, 30);
    });

    test('returns updated object in response', async () => {
      const blogs = await Blog.find({});
      const blogToUpdate = blogs[0];
      const goodId = blogToUpdate.id.toString();

      const res = await api
        .patch(`/api/blogs/${goodId}`)
        .send({ likes: 40 })
        .expect(200);

      blogToUpdate.likes = 40;
      assert.deepStrictEqual(res?.body, blogToUpdate.toJSON());
    });

    test('sends not found (404) for valid, non-existent id', async () => {
      const badId = await giveValidRemovedBlogId();
      await api.patch(`/api/blogs/${badId}`).send({ likes: 30 }).expect(404);
    });

    test('sends bad request (400) for invalid id', async () => {
      const badId = '5a42h3xh45n0xes4df7';
      await api.patch(`/api/blogs/${badId}`).send({ likes: 30 }).expect(400);
    });

    test('sends bad request (400) for empty payload', async () => {
      const goodId = await giveValidBlogId();
      await api.patch(`/api/blogs/${goodId}`).send({}).expect(400);
    });

    test('sends bad request (400) for invalid payload', async () => {
      const goodId = await giveValidBlogId();
      await api.patch(`/api/blogs/${goodId}`).send({ likes: 'k' }).expect(400);
    });
  });
});

describe('database', () => {
  test('blog is initialized with 0 likes if not specified', async () => {
    // testaa ensin ilman tykkäyksiä
    let newBlog = {
      title: "You Don't Know JS Yet (book series)",
      author: 'Kyle Simpson',
      url: 'https://github.com/getify/You-Dont-Know-JS',
    };

    let res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    let blogId = res?.body?.id;

    let addedBlog = await Blog.findById(blogId);
    assert.strictEqual(addedBlog?.likes, 0);

    // sitten tykkäyksien kanssa
    newBlog = {
      title: 'Node.js Best Practices',
      author: 'GitHub - goldbergyoni',
      url: 'https://github.com/goldbergyoni/nodebestpractices',
      likes: 30,
    };

    res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    blogId = res?.body?.id;

    addedBlog = await Blog.findById(blogId);
    assert.strictEqual(addedBlog?.likes, 30);
  });
});

after(async () => {
  await mongoose.connection.close();
});
