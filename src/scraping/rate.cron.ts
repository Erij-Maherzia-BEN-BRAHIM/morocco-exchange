
import cron from 'node-cron';
import { scrapeAttijari } from '../scraping/attijariwafa.scraper';
//import { scrapeBMCE } from '../scraping/bmce/scraper';         // Exemple si tu ajoutes d'autres
import { scrapeBankAlMaghrib } from '../scraping/bankAlmaghrib.scapper'; // Exemple

export const startRateUpdateJob = () => {
  cron.schedule('*/30 * * * *', async () => {
    console.log('🔄 Mise à jour automatique des taux...');

    try {
      await Promise.all([
        scrapeAttijari(),
        // scrapeBMCE(),
         scrapeBankAlMaghrib(),
      ]);
      console.log('✅ Tous les scrapers ont terminé');
    } catch (error) {
      console.error('❌ Une erreur est survenue pendant le scraping :', error);
    }
  });
};
