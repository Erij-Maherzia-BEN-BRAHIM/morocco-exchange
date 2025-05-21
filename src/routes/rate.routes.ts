import express from 'express';
import { getRates, getBestBuy, getBestSell, addOrUpdateRate } from '../controllers/rate.controller';
import { authMiddleware } from '../middlewares/auth.middleware';


const router = express.Router();
router.post('/bureau/add', authMiddleware, addOrUpdateRate);
router.get('/', getRates);
router.get('/best-buy', getBestBuy);
router.get('/best-sell', getBestSell);

export default router;

