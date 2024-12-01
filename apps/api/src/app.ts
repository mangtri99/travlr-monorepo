import express from 'express';
import cors from 'cors';
import * as path from 'path';
import ProductRoutes from './routes/product';
import AuthRoutes from './routes/auth';
import SeedRoutes from './routes/seed';
import bodyParser from 'body-parser';
import { authMiddleware } from './middleware/authMiddleware';
import { BASE_API_URL_AUTH, BASE_API_URL_PRODUCTS } from './config/url';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use(BASE_API_URL_AUTH, AuthRoutes);
app.use(BASE_API_URL_PRODUCTS, [authMiddleware], ProductRoutes);

app.use('/run/seeder', SeedRoutes);
