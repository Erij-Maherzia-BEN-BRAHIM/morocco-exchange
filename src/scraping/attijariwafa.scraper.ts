import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { RateModel } from '../models/rate.model';

interface ExchangeRate {
  currency: string;
  buyRate: number;
  sellRate: number;
  unit: string;
  bank: string;
}

const currencyMap: Record<string, string> = {
  'EURO': 'EUR',
  'COURONNE SUEDOISE': 'SEK',
  'DINAR KOWEITIEN(BB)': 'KWD',
  'DINAR BAHREIN': 'BHD',
  'DIRHAM E-A-U (BB)': 'AED',
  'DOLLAR CANADIEN': 'CAD',
  'DOLLARS USD': 'USD',
  'FRANC SUISSE': 'CHF',
  'LIVRE STERLING': 'GBP',
  'LIVRE DE GIBRALTAR': 'GIP',
  'RIYAL QATARI': 'QAR',
  'RIYAL SAOUDIEN (BB)': 'SAR',
  'RIYAL OMANAIS': 'OMR',
  'YEN JAPONAIS': 'JPY',
};

export async function scrapeAttijariRates(): Promise<ExchangeRate[]> {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    console.log('🌐 Navigating to the page...');
    await page.goto('https://attijarinet.attijariwafa.com/particulier/public/coursdevise', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForSelector('table', { timeout: 10000 });
    const html = await page.content();
    const $ = cheerio.load(html);

    const results: ExchangeRate[] = [];
    const tableRows = $('table tr');

    tableRows.each((index, el) => {
      const tds = $(el).find('td');
      if (tds.length < 6) return;

      const unit = $(tds[1]).text().trim();
      const currencyName = $(tds[2]).text().trim().toUpperCase();
      const buy = $(tds[3]).text().trim().replace(',', '.');
      const sell = $(tds[4]).text().trim().replace(',', '.');

      // Skip header row and invalid entries
      if (currencyName === 'LIBELLÉ' || !currencyName) return;

      // Validate currency mapping
      if (!currencyMap[currencyName]) {
        console.log(`⏩ Skipping unmapped currency: "${currencyName}"`);
        return;
      }

      // Validate numerical values
      const unitNum = parseInt(unit, 10);
      const buyRate = parseFloat(buy);
      const sellRate = parseFloat(sell);

      if (isNaN(unitNum)) {
        console.log(`⏩ Skipping invalid unit: "${unit}" for ${currencyName}`);
        return;
      }

      if (isNaN(buyRate) || isNaN(sellRate)) {
        console.log(`⏩ Skipping invalid rates for ${currencyName}`);
        return;
      }

      // Normalize rates based on unit
      const normalizedBuy = unitNum > 1 ? buyRate / unitNum : buyRate;
      const normalizedSell = unitNum > 1 ? sellRate / unitNum : sellRate;

      results.push({
        currency: currencyMap[currencyName],
        unit: unit,
        buyRate: Number(normalizedBuy.toFixed(6))*Number(unit),
        sellRate: Number(normalizedSell.toFixed(6))*Number(unit),
        bank: 'attijari',
      });

      console.log(`✅ Added ${currencyMap[currencyName]} (${unit} units): Buy ${normalizedBuy*Number(unit)}, Sell ${normalizedSell*Number(unit)}`);
    });

    console.log('✅ Scraping completed successfully');
    return results;
    
  } catch (error) {
    console.error('❌ Scraping failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}
export async function updateAttijariRates(): Promise<{ updated: number; errors: string[] }> {
  try {
    console.log('🔄 Starting rate update process...');
    const rates = await scrapeAttijariRates();
    
    let updatedCount = 0;
    const errors: string[] = [];
    
    for (const rate of rates) {
      try {
        const filter = { 
          currency: rate.currency, 
          bank: rate.bank 
        };
        
        const update = {
          buyRate: rate.buyRate,
          sellRate: rate.sellRate,
          updatedAt: new Date(),
          unit: rate.unit,
          bank: rate.bank
        };

        const result = await RateModel.findOneAndUpdate(
          filter,
          update,
          { upsert: true, new: true }
        );

        if (result) {
          updatedCount++;
          console.log(`✅ Updated ${rate.currency} rates in database`);
        }
      } catch (error) {
        const errorMsg = `Failed to update ${rate.currency}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(`❌ ${errorMsg}`);
        errors.push(errorMsg);
      }
    }
    
    console.log(`🎉 Successfully updated ${updatedCount} Attijari rates in database`);
    return { updated: updatedCount, errors };
    
  } catch (error) {
    console.error('❌ Error updating Attijari rates:', error);
    throw error;
  }
}
