import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('got ping, sending pong');
  return res.status(200).send('pong');
});

// API:n varsinaiset alireittimet
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

// palvelimen käynnistys
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
