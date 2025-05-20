import express, { Request, Response, NextFunction } from 'express';
import { getRates, getBestBuy, getBestSell, addOrUpdateRate } from '../controllers/rate.controller';
import { authMiddleware } from '../middlewares/auth.middleware';


const router = express.Router();

// Bureau: requires authentication
router.post('/bureau/add', authMiddleware, (req: Request, res: Response, next: NextFunction) => addOrUpdateRate(req, res));

// Bank: no authentication required
router.post('/bank/add', (req: Request, res: Response, next: NextFunction) => addOrUpdateRate(req, res));

router.get('/', getRates);
router.get('/best-buy', getBestBuy);
router.get('/best-sell', getBestSell);

export default router;

