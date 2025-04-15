import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getFormattedRates } from "@/utils/fetch-rates";
import { ExchangeRateModel } from "@/models/exchange-rate";

export async function POST() {
  await connectDB();

  const rates = await getFormattedRates();

  // Optional: clean up duplicates for that date
  const date = rates[0]?.date;
  await ExchangeRateModel.deleteMany({ date });

  const saved = await ExchangeRateModel.insertMany(rates);

  return NextResponse.json({ success: true, count: saved.length });
}
