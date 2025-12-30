import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSpreadsheet extends Document {
    userId: mongoose.Types.ObjectId;
    spreadsheetId: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSpreadsheetSchema = new Schema<IUserSpreadsheet>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    spreadsheetId: { type: String, required: true },
}, { timestamps: true, collection: 'user_spreadsheets' });

export default mongoose.model<IUserSpreadsheet>('UserSpreadsheet', UserSpreadsheetSchema);
