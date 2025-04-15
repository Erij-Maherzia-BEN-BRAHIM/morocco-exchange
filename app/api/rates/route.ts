import { NextRequest, NextResponse } from "next/server";

const API_URL =
  "https://api.centralbankofmorocco.ma/cours/Version1/api/CoursBBE";

async function fetchRates(date: string) {
  const url = `${API_URL}?date=${date}`;
  const res = await fetch(url, {
    headers: {
      "ocp-apim-subscription-key": process.env.CENTRAL_BANK_API_KEY as string,
    },
  });
  if (!res.ok) return [];
  return await res.json();
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0] + "T08:30:00.000Z";
}

function getPreviousDate(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return formatDate(d);
}

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

export async function GET(req: NextRequest) {
  let currentDate = new Date();
  let todayStr = formatDate(currentDate);
  let todayRates = await fetchRates(todayStr);

  // If empty, go back to the most recent date with data
  while (todayRates.length === 0) {
    currentDate.setDate(currentDate.getDate() - 1);
    todayStr = formatDate(currentDate);
    todayRates = await fetchRates(todayStr);
  }

  const previousDateStr = getPreviousDate(todayStr);
  const previousRates = await fetchRates(previousDateStr);

  const result = todayRates.map((rateToday: any) => {
    const prev = previousRates.find(
      (r: any) => r.libDevise === rateToday.libDevise
    );
    const todayVal = rateToday.venteClientele;
    const prevVal = prev ? prev.venteClientele : todayVal;

    return {
      code: rateToday.libDevise,
      name: currencyNames[rateToday.libDevise] || rateToday.libDevise, // fallback to code if name not found
      rate: todayVal,
      change: parseFloat((todayVal - prevVal).toFixed(4)),
    };
  });

  return NextResponse.json({
    date: todayStr.split("T")[0],
    rates: result,
  });
}
