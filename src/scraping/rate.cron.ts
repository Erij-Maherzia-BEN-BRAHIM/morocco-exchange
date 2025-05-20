
import cron from 'node-cron';
import { updateAttijariRates } from '../scraping/attijariwafa.scraper';


export const startRateUpdateJob = () => {
  cron.schedule('*/30 * * * *', async () => {
    console.log('🔄 Mise à jour automatique des taux...');

    try {
      await Promise.all([
      updateAttijariRates(),
      // scrapeBMCE(),
      //  scrapeBankAlMaghrib(),
      ]);
      console.log('✅ Tous les scrapers ont terminé');
    } catch (error) {
      console.error('❌ Une erreur est survenue pendant le scraping :', error);
    }
    });
};
