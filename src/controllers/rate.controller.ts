import { Request, Response } from 'express';
import { RateModel } from '../models/rate.model';


export function getRates(req: Request, res: Response) {
  RateModel.find()
    .then(function (rates) {
      res.json(rates);
    })
    .catch(function (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des taux' });
    });
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

export function addOrUpdateRate(req: Request, res: Response): void {
  var currency = req.body.currency;
  var buyRate = req.body.buyRate;
  var sellRate = req.body.sellRate;
  var unit = req.body.unit || '1';
  var bank = req.body.bank;
  var userId = (req as any).user?.id;

  let filter: any = { currency };
  let update: any = { buyRate, sellRate, updatedAt: new Date(), unit };

  if (userId) {
    filter.bureau = userId;
    update.bureau = userId;
  } else if (bank) {
    filter.bank = bank;
    update.bank = bank;
  } else {
    res.status(400).json({ error: 'bureau (auth) or bank is required' });
    return;
  }

  RateModel.findOneAndUpdate(
    filter,
    update,
    { upsert: true, new: true }
  )
    .then(function (rate) {
      res.json(rate);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout ou la mise à jour du taux' });
    });
}
