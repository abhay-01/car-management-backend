import express, { json } from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
app.use(json());
connectDB();

app.use(cors({
    origin: '*',
    credentials: true
}));


const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Car Management API',
            description: 'Car Management API Information',
            contact:{
                name: 'Amazing Developer'
            },
        },
    },

    apis: ["./routes/*.js"],

}


const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
