import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import rateRoutes from './routes/rate.routes';
import authRoutes from './routes/auth.routes';
import morgan from 'morgan'; // added
import { scrapeAttijariRates } from './scraping/attijariwafa.scraper';
import { startRateUpdateJob } from './scraping/rate.cron';


dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // added
app.use('/api/rates', rateRoutes);

app.use('/api/auth', authRoutes);

connectDB();
startRateUpdateJob();

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
