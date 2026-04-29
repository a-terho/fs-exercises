import express from 'express';
const app = express();

app.get('/api/ping', (_req, res) => {
  console.log('got ping, sending pong');
  return res.status(200).send('pong');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
