import express from 'express';
import Stripe from 'stripe';
import Settings from '../models/Settings.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';

const router = express.Router();

// Helper to get Stripe instance
const getStripe = async () => {
    const settings = await Settings.findOne();
    if (!settings || !settings.stripeSecretKey) {
        throw new Error('Stripe is not configured');
    }
    return new Stripe(settings.stripeSecretKey, {
        apiVersion: '2024-12-18.acacia' as any, // Use latest or compatible API version
    });
};

/**
 * @route   POST /api/payment/verify-session
 * @desc    Verify Stripe session and create subscription
 */
router.post('/verify-session', async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }

        const stripe = await getStripe();

        // Retrieve the session
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['subscription', 'line_items']
        });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const customerEmail = session.customer_details?.email?.toLowerCase();

        if (!customerEmail) {
            return res.status(400).json({ message: 'No email found in session' });
        }

        // Find or Update User
        // We match by email as requested
        let user = await User.findOne({ email: customerEmail });

        if (!user) {
            // If user doesn't exist, we could create them, strictly speaking the prompt says "match with email address".
            // If the user isn't in our DB, we can create a skeleton user.
            user = new User({
                email: customerEmail,
                isSubscribed: true
            });
            await user.save();
        } else {
            user.isSubscribed = true;
            await user.save();
        }

        // Extract Subscription Details
        const subscriptionData = session.subscription as Stripe.Subscription;
        const lineItem = session.line_items?.data[0]; // Assuming one main item

        // Amount is usually in cents for Stripe, convert to major unit if needed or keep as is.
        // User asked for "Amount", let's store what we see (e.g. 2900 for $29.00) or normalize.
        // Typically best to store as is or cents. Let's use the amount_total from session which is convenient.
        const amountTotal = session.amount_total || 0;
        const amount = amountTotal / 100; // Convert to dollars/euro for display
        const currency = session.currency || 'usd';

        const planName = lineItem?.description || 'Premium Plan';

        // Upsert Subscription
        // If we already have this subscription ID, update it.
        const stripeSubId = typeof subscriptionData === 'string' ? subscriptionData : subscriptionData?.id;
        const currentPeriodEnd = (typeof subscriptionData === 'object' && subscriptionData !== null && 'current_period_end' in subscriptionData)
            ? new Date((subscriptionData as any).current_period_end * 1000)
            : new Date();
        const status = (typeof subscriptionData === 'object' && subscriptionData !== null && 'status' in subscriptionData)
            ? (subscriptionData as any).status
            : session.payment_status;

        let subscription = await Subscription.findOne({ stripeSubscriptionId: stripeSubId });

        if (!subscription) {
            subscription = new Subscription({
                userId: user._id,
                stripeSubscriptionId: stripeSubId,
                stripeCustomerId: session.customer as string,
                planName: planName,
                amount: amount,
                currency: currency,
                status: status,
                currentPeriodEnd: currentPeriodEnd,
                paymentEmail: customerEmail
            });
        } else {
            subscription.status = status;
            subscription.currentPeriodEnd = currentPeriodEnd;
            subscription.planName = planName; // In case it upgraded
        }

        await subscription.save();

        res.json({
            status: 'success',
            data: {
                subscriptionId: stripeSubId,
                email: customerEmail,
                amount: amount,
                currency: currency,
                plan: planName,
                customerName: session.customer_details?.name
            }
        });

    } catch (err: any) {
        console.error('Payment verification error:', err);
        res.status(500).json({ message: err.message || 'Payment verification failed' });
    }
});

/**
 * @route   GET /api/payment/subscriptions
 * @desc    Get all subscriptions (Admin)
 */
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find().populate('userId', 'email').sort({ createdAt: -1 });
        res.json(subscriptions);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
