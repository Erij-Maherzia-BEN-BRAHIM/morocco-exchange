
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['bureau', 'admin'], default: 'bureau' }
});

export const UserModel = mongoose.model('User', userSchema);
