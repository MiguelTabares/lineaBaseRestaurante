import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (Placeholder)
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend SIGR funcionando correctamente' });
});

export default app;
