/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();

import ProductRoutes from './routes/product';
import AuthRoutes from './routes/auth';
import SeedRoutes from './routes/seed';
import bodyParser from 'body-parser';
import { authMiddleware } from './middleware/authMiddleware';

app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/api/auth', AuthRoutes);
app.use('/api/products', [authMiddleware], ProductRoutes);

app.use('/run/seeder', SeedRoutes);

const port = process.env.EXPRESS_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
