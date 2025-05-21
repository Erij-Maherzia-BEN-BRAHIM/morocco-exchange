import axios from 'axios';
import cheerio from 'cheerio';
import { RateModel } from '../models/rate.model';

export function scrapeBankAlMaghrib {
  axios.get('https://attijarinet.attijariwafa.com/particulier/public/coursdevise')
    .then(response => {
      const $ = cheerio.load(response.data);

      // Le tableau des devises est le premier tableau sur la page
      $('table tbody tr').each(function () {
        const currency = $(this).find('td').eq(0).text().trim();
        const buyRateStr = $(this).find('td').eq(1).text().trim();
        const sellRateStr = $(this).find('td').eq(2).text().trim();

        const buyRate = parseFloat(buyRateStr.replace(',', '.'));
        const sellRate = parseFloat(sellRateStr.replace(',', '.'));

        if (currency && !isNaN(buyRate) && !isNaN(sellRate)) {
          RateModel.findOneAndUpdate(
            { source: 'bankAlmaghrib', currency },
            { buyRate, sellRate, updatedAt: new Date(), sourceType: 'bank' },
            { upsert: true }
          ).then(() => {
            console.log(`[bankAlmaghrib] ${currency} mis à jour`);
          }).catch(console.error);
        }
      });
    })
    .catch(err => {
      console.error('Erreur récupération bankAlmaghrib:', err.message);
    });
}

export function updateBankRates() {
    scrapeBankAlMaghrib();
  // Ajoute d'autres banques si besoin
}
