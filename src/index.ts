import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import rateRoutes from './routes/rate.routes';
import authRoutes from './routes/auth.routes';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/rates', rateRoutes);

app.use('/api/auth', authRoutes);

connectDB();


app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
