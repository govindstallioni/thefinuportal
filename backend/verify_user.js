import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://doadmin:480371y9A6iJfokM@db-mongodb-blr1-04289-54c7d00f.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';
mongoose.connect(MONGODB_URI)
    .then(async () => {
    console.log('Connected to DB');
    const user = await User.findOne({ email: 'govind@stallioni.com' });
    if (user) {
        console.log('User found:', user);
    }
    else {
        console.log('User NOT found');
    }
    process.exit(0);
})
    .catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=verify_user.js.map