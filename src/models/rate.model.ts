import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  buyRate: Number,
  sellRate: Number,
  updatedAt: { type: Date, default: Date.now },
});

export const RateModel = mongoose.model('Rate', rateSchema);