import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/', (_req, res) => {
  res.send('Hola mundo desde TypeScript y Express');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});