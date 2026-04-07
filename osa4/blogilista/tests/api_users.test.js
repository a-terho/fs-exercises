const assert = require('node:assert');
const { test, describe, beforeEach, after } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const api = supertest(app);

const { usersMany } = require('./data');
const User = require('../models/User');

describe('route /api/users with empty database', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('GET', () => {
    test('responds with json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('POST', () => {
    test('creates new user with valid data', async () => {
      const newUser = {
        username: 'a-terho',
        password: 'password',
        name: 'a-terho',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const users = await User.find({});
      assert.strictEqual(users.length, 1);
    });

    test('returns id field in correct format', async () => {
      const newUser = {
        username: 'a-terho',
        password: 'password',
        name: 'a-terho',
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(
        typeof res?.body.id,
        'string',
        `wrong type for id, expected string, got ${typeof res?.body.id}`,
      );
      assert.strictEqual(
        res?.body._id,
        undefined,
        '_id field is not removed from the response',
      );
    });

    test('does not reveal password hash in response', async () => {
      const newUser = {
        username: 'a-terho',
        password: 'password',
        name: 'a-terho',
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(res?.body.passwordHash, undefined);
    });

    test('sends bad request (400) for invalid payload', async () => {
      // lähetä tyhjä json payload
      await api.post('/api/users').send({}).expect(400);

      const newUser = {
        username: 'a-terho',
        password: 'password',
        name: 'a-terho',
      };

      // lähetä json ilman riittävää payloadia
      for (let field of ['username', 'password', 'name']) {
        const badUser = { ...newUser };
        delete badUser[field];
        await api.post('/api/users').send(badUser).expect(400);
      }

      // lähetä liian lyhyt käyttäjänimi tai salasana (<3 kirjainta)
      for (let field of ['username', 'password']) {
        const badUser = { ...newUser };
        badUser[field] = badUser[field].substring(0, 2);
        await api.post('/api/users').send(badUser).expect(400);
      }
    });
  });
});

describe('route /api/users with some users in database', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.insertMany(usersMany);
  });

  describe('GET', () => {
    test('returns correct number of users', async () => {
      const res = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(res?.body.length, usersMany.length);
    });

    test('returns id field in correct format', async () => {
      const res = await api.get('/api/users');

      for (let user of res?.body) {
        assert.strictEqual(
          typeof user?.id,
          'string',
          `wrong type for id, expected string, got ${typeof user?.id}`,
        );
        assert.strictEqual(
          user?._id,
          undefined,
          '_id field is not removed from the response',
        );
      }
    });

    test('does not reveal password hashes in response', async () => {
      const res = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      for (let user of res?.body) {
        assert.strictEqual(user.passwordHash, undefined);
      }
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
