import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
    name: string;
    type: 'bank' | 'cash' | 'credit';
    balance: number;
    color: string;
}

const AccountSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['bank', 'cash', 'credit'], required: true },
    balance: { type: Number, default: 0 },
    color: { type: String, default: '#3b82f6' }
}, { timestamps: true });

export default mongoose.model<IAccount>('Account', AccountSchema);
