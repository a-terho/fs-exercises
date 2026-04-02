const assert = require('node:assert');
const { test, describe, beforeEach, after } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const api = supertest(app);

const { blogsMany } = require('./blogs');
const Blog = require('../models/Blog');

// testitietokannan valmistelu
beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(blogsMany);
});

describe('route /api/blogs', () => {
  test('GET responds with json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET returns correct number of blogs', async () => {
    const blogs = await Blog.find({});
    const res = await api.get('/api/blogs');
    assert.strictEqual(blogs.length, res.body?.length);
  });

  test('GET returns id field in correct format', async () => {
    const blogs = await Blog.find({});
    const res = await api.get('/api/blogs');

    for (let blog of res.body) {
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

  test('POST adds new blog from a valid post', async () => {
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
    let blogId = res.body?.id;

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
    blogId = res.body?.id;

    addedBlog = await Blog.findById(blogId);
    assert.strictEqual(addedBlog?.likes, 30);
  });

  test('POST sends bad request response correctly', async () => {
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

after(async () => {
  await mongoose.connection.close();
});
