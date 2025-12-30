import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
    date: Date;
    accountId: mongoose.Types.ObjectId;
}

const TransactionSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, default: Date.now },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
