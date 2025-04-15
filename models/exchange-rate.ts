import mongoose from "mongoose";

const exchangeRateSchema = new mongoose.Schema({
  achatClientele: { type: Number, required: true },
  date: { type: Date, required: true },
  libDevise: { type: String, required: true },
  uniteDevise: { type: Number, required: true },
  venteClientele: { type: Number, required: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
});

export const ExchangeRateModel =
  mongoose.models.ExchangeRate ||
  mongoose.model("ExchangeRate", exchangeRateSchema);
