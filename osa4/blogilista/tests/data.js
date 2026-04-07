const blogs = [
  {
    _id: '661a2a001',
    title: 'The Node.js Event Loop, Timers, and process.nextTick()',
    author: 'Node.js Documentation',
    url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/',
    likes: 320,
    __v: 0,
  },
  {
    _id: '661a2a002',
    title: 'Using Promises',
    author: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
    likes: 280,
    __v: 0,
  },
  {
    _id: '661a2a003',
    title: 'Async functions',
    author: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
    likes: 260,
    __v: 0,
  },
  {
    _id: '661a2a004',
    title: 'Express “Hello World” example',
    author: 'Express.js',
    url: 'https://expressjs.com/en/starter/hello-world.html',
    likes: 190,
    __v: 0,
  },
  {
    _id: '661a2a005',
    title: 'A complete guide to JavaScript closures',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/javascript-closures-explained/',
    likes: 410,
    __v: 0,
  },
  {
    _id: '661a2a006',
    title: 'Understanding JavaScript Prototypes',
    author: 'DigitalOcean',
    url: 'https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript',
    likes: 230,
    __v: 0,
  },
  {
    _id: '661a2a007',
    title: 'Node.js Streams: Everything you need to know',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/',
    likes: 350,
    __v: 0,
  },
  {
    _id: '661a2a008',
    title: 'Error Handling in Node.js',
    author: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/',
    likes: 150,
    __v: 0,
  },
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

const blogsOne = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogsMany = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const usersMany = [
  {
    username: 'a-terho',
    passwordHash:
      '$2b$10$ACM8T7gA.PIs5BYCzi9Oz.j/HgEJ5SzP9usJtyKAGYEXsX7u7JN/S',
    name: 'a-terho',
  },
  {
    username: 'b-terho',
    passwordHash:
      '$2b$10$S5M/VR6lHoSPHKkh43jdCu2yvy6O8mGULiBIDVRyhscQBiAvpkxsa',
    name: 'b-terho',
  },
  {
    username: 'c-terho',
    passwordHash:
      '$2b$10$o/.h268JudlnKS9DWTPfau7oN54XmoZWw46WFfQJI4oxQda066C82',
    name: 'c-terho',
  },
];

module.exports = { blogs, blogsOne, blogsMany, usersMany };
