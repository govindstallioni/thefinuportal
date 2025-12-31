import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    isSubscribed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    isSubscribed: { type: Boolean, default: false },
}, { timestamps: true, collection: 'users' });

export default mongoose.model<IUser>('User', UserSchema);
