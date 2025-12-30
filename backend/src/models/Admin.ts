import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true, collection: 'admin' });

AdminSchema.pre('save', async function (next) {
    const admin = this as IAdmin;
    if (!admin.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(admin.password, salt);
        admin.password = hash;
    } catch (err: any) {
        // In newer mongoose versions it's better to just return an error or let it bubble
        throw err;
    }
});

AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const admin = this as IAdmin;
    return bcrypt.compare(password, admin.password);
};

export default mongoose.model<IAdmin>('Admin', AdminSchema);
