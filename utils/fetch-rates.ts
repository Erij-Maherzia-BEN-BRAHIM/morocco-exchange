import axios from "axios";

const currencyNames: Record<string, string> = {
  AED: "UAE Dirham",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  SAR: "Saudi Riyal",
  USD: "US Dollar",
  KWD: "Kuwaiti Dinar",
  BHD: "Bahraini Dinar",
  OMR: "Omani Rial",
  QAR: "Qatari Riyal",
  GIP: "Gibraltar Pound",
};

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0] + "T08:30:00.000Z";
}

async function fetchRawRates(date: Date) {
  const url = `https://api.centralbankofmorocco.ma/cours/Version1/api/CoursBBE?date=${formatDate(
    date
  )}`;
  const res = await axios.get(url, {
    headers: {
      "ocp-apim-subscription-key": process.env.CENTRAL_BANK_API_KEY as string,
    },
  });
  return res.data;
}

export async function getFormattedRates(): Promise<any[]> {
  const today = new Date();
  let rawRates = await fetchRawRates(today);

  if (!rawRates || rawRates.length === 0) {
    // Try yesterday if no data for today
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    rawRates = await fetchRawRates(yesterday);
  }

  return rawRates.map((r: any) => ({
    achatClientele: r.achatClientele,
    date: new Date(r.date),
    libDevise: r.libDevise,
    uniteDevise: r.uniteDevise,
    venteClientele: r.venteClientele,
    name: currencyNames[r.libDevise] ?? r.libDevise,
    source: "Bank Al-Maghrib",
  }));
}
