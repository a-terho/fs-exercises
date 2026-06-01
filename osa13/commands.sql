CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (title, author, url) VALUES ('Node.js Best Practices', 'GitHub - goldbergyoni', 'https://github.com/goldbergyoni/nodebestpractices')

INSERT INTO blogs (title, author, url) VALUES ('You Don''t Know JS Yet (book series)', 'Kyle Simpson', 'https://github.com/getify/You-Dont-Know-JS')