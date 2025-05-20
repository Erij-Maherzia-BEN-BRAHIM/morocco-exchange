import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  buyRate: Number,
  sellRate: Number,
  updatedAt: { type: Date, default: Date.now },
  bureau: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // now optional
  bank: { type: String }, // added
  unit: { type: String, default: '1' } 
});

export const RateModel = mongoose.model('Rate', rateSchema);