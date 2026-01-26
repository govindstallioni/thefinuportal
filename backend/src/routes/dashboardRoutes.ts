import express from 'express';
import User from '../models/User.js';
import Account from '../models/Account.js';
import Subscription from '../models/Subscription.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const subscribedUsers = await User.countDocuments({ isSubscribed: true });

        // Connected Accounts (where status: true as per previous modification)
        const totalAccounts = await Account.countDocuments();
        const activeAccounts = await Account.countDocuments({ status: true });

        // Calculate total revenue from active subscriptions
        const subscriptions = await Subscription.find({ status: { $in: ['active', 'paid'] } });
        const totalRevenue = subscriptions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

        res.json({
            totalUsers,
            subscribedUsers,
            totalAccounts,
            activeAccounts,
            totalRevenue,
            // Growth percentages (mocked for now or calculated if we had history)
            userGrowth: "+12%",
            accountGrowth: "+5%"
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
