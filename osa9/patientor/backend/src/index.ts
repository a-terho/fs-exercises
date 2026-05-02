import express from 'express';

import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';
import { globalErrorHandler } from './middleware.ts';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('got ping, sending pong');
  return res.status(200).send('pong');
});

// API:n varsinaiset alireitittimet
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

// virheidenkäsittelijä
app.use(globalErrorHandler);

// palvelimen käynnistys
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
