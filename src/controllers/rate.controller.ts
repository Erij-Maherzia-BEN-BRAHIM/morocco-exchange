import { Request, Response } from 'express';
import { RateModel } from '../models/rate.model';


export function getRates(req: Request, res: Response) {
  var rates = req.body.rates;
  res.json(rates);
}


export function getBestBuy(req: Request, res: Response) {
  RateModel.findOne().sort({ buyRate: 1 }).then(function (best) {
    res.json(best);
  }).catch(function (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du meilleur taux d\'achat' });
  });
}

export function getBestSell(req: Request, res: Response) {
  RateModel.findOne().sort({ sellRate: -1 }).then(function (best) {
    res.json(best);
  }).catch(function (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du meilleur taux de vente' });
  });
}

export function addOrUpdateRate(req: Request, res: Response) {
  var currency = req.body.currency;
  var buyRate = req.body.buyRate;
  var sellRate = req.body.sellRate;
  var userId = (req as any).user.id;

  RateModel.findOneAndUpdate(
    { bureau: userId, currency: currency },
    { buyRate: buyRate, sellRate: sellRate, updatedAt: new Date() },
    { upsert: true, new: true }
  )
    .then(function (rate) {
      res.json(rate);
    })
    .catch(function (err) {
      res.status(500).json({ error: 'Erreur lors de l\'ajout ou la mise à jour du taux' });
    });
}
