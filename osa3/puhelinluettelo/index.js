const express = require('express');
const app = express();

const morgan = require('morgan');

let people = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: '1',
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: '2',
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: '3',
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: '4',
  },
];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// luodaan req.body
app.use(express.json());

// jaetaan frontend
app.use(express.static('dist'));

// loggaus, pohjana 'tiny' formaatti
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
);
app.use(logger);

app.get('/info', (req, res) => {
  const now = new Date().toString();
  const markup = `<p>Phonebook has info for ${people.length} people</p><p>${now}</p>`;
  res.status(200).send(markup);
});

// käyttää JSend spesifikaatiota
// https://github.com/omniti-labs/jsend

app.get('/api/persons', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: people,
  });
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      status: 'error',
      message: 'bad request: name and/or number missing',
    });
  }

  const found = people.find((p) => p.name.toLowerCase() === name.toLowerCase());
  if (found) {
    return res.status(400).json({
      status: 'error',
      message: `name ${name} already exists in the phonebook`,
    });
  }

  const person = {
    name,
    number,
    id: String(randInt(0, 1_000_000)),
  };
  people = people.concat(person);

  res.status(200).json({
    status: 'success',
    data: person,
  });
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({
      status: 'error',
      message: `person with id ${id} not found`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: person,
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  people = people.filter((p) => p.id !== id);
  res.status(204).end();
});

// luo palvelin
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
