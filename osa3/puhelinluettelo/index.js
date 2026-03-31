require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');
const Person = require('./models/Person');

// luodaan req.body
app.use(express.json());

// jaetaan frontend
app.use(express.static('dist'));

// loggaus, pohjana morganin 'tiny' formaatti
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.get('/info', (req, res) => {
  Person.countDocuments({}).then((numPeople) => {
    const now = new Date().toString();
    const markup = `<p>Phonebook has info for ${numPeople} people</p><p>${now}</p>`;
    return res.status(200).send(markup);
  });
});

// käytän JSend spesifikaatiota osassa HTTP responseja
// https://github.com/omniti-labs/jsend

// hae kaikki henkilöt
app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => res.status(200).json(people));
});

// lisää henkilö
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (name === undefined || number === undefined) {
    return res.status(400).json({
      status: 'fail',
      data: {
        ...(!name && { name: 'missing required field' }),
        ...(!number && { number: 'missing required field' }),
      },
    });
  }

  // sama kuin new Person({ name, number }).save()
  Person.create({ name, number })
    .then((person) => res.status(201).json(person))
    .catch((err) => next(err));
});

// hae tietty henkilö
app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({
          status: 'error',
          message: `person with id ${id} not found`,
        });
      }

      return res.status(200).json(person);
    })
    .catch((err) => next(err));
});

// päivitä henkilön tietoja
app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  // tällä hetkellä sovellus tukee vain numeron päivitystä
  const { number } = req.body;
  if (number === undefined) {
    return res.status(400).json({
      status: 'fail',
      data: { number: 'missing required field' },
    });
  }

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({
          status: 'error',
          message: `person with id ${id} not found`,
        });
      }

      person.number = number;
      person
        .save()
        .then((updatedPerson) => res.status(200).json(updatedPerson))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// poista henkilö
app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

// keskitetty virheidenkäsittelyn middleware
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    status: 'error',
    message: err.message,
  });

  // jatka vielä Expressin virallisella virheidenkäsittelijällä
  next(err);
});

// luo palvelin
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
