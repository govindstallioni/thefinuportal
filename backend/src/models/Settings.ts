import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    plaidClientKey: string;
    plaidSecretKey: string;
    plaidEnvironment: 'sandbox' | 'production';
    spreadsheetTemplateUrl: string;
    appInstruction: string;
    notificationEmail: string;
    appEmail: string;
}

const SettingsSchema: Schema = new Schema({
    plaidClientKey: { type: String, default: '' },
    plaidSecretKey: { type: String, default: '' },
    plaidEnvironment: { type: String, enum: ['sandbox', 'production'], default: 'sandbox' },
    spreadsheetTemplateUrl: { type: String, default: '' },
    appInstruction: { type: String, default: '' },
    notificationEmail: { type: String, default: '' },
    appEmail: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model<ISettings>('Settings', SettingsSchema);
