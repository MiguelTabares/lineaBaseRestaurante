import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes';
import menuRoutes from './routes/menu.routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend SIGR funcionando correctamente' });
});

export default app;
