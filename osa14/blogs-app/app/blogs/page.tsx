const blogs = [
  {
    id: '661a2a001',
    title: 'The Node.js Event Loop, Timers, and process.nextTick()',
    author: 'Node.js Documentation',
    url: 'https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick',
    likes: 320,
  },
  {
    id: '661a2a002',
    title: 'Using Promises',
    author: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
    likes: 280,
  },
  {
    id: '661a2a003',
    title: 'Async functions',
    author: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
    likes: 260,
  },
  {
    id: '661a2a004',
    title: 'Express “Hello World” example',
    author: 'Express.js',
    url: 'https://expressjs.com/en/starter/hello-world.html',
    likes: 190,
  },
  {
    id: '661a2a005',
    title: 'How Closures Work in JavaScript: A Handbook for Developers',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/how-closures-work-in-javascript-a-handbook-for-developers/',
    likes: 410,
  },
  {
    id: '661a2a006',
    title: 'Understanding JavaScript Prototypes',
    author: 'DigitalOcean',
    url: 'https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript',
    likes: 230,
  },
  {
    id: '661a2a007',
    title: 'Node.js Streams: Everything you need to know',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/',
    likes: 350,
  },
  {
    id: '661a2a008',
    title: 'Error Handling in Node.js',
    author: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/',
    likes: 150,
  },
  {
    id: '661a2a009',
    title: 'Node.js Best Practices',
    author: 'GitHub - goldbergyoni',
    url: 'https://github.com/goldbergyoni/nodebestpractices',
    likes: 600,
  },
  {
    id: '661a2a010',
    title: "You Don't Know JS Yet (book series)",
    author: 'Kyle Simpson',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    likes: 600,
  },
];

const Blogs = () => {
  return (
    <>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a> by {blog.author} ({blog.likes}{' '}
            likes)
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blogs;
