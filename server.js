import express, { json } from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(json());
connectDB();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
