import express from 'express';
import Settings from '../models/Settings.js';
import { gasAuth } from '../middleware/gasAuthMiddleware.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get public settings (safe for app/frontend usage — no secrets)
router.get('/public', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            return res.json({
                stripePublicKey: '',
                stripePaymentMode: 'sandbox',
                appInstruction: '',
                appEmail: '',
                spreadsheetTemplateUrl: '',
                plaidEnvironment: 'sandbox'
            });
        }

        res.json({
            stripePublicKey: settings.stripePublicKey,
            stripePaymentMode: settings.stripePaymentMode,
            appInstruction: settings.appInstruction,
            appEmail: settings.appEmail,
            spreadsheetTemplateUrl: settings.spreadsheetTemplateUrl,
            plaidEnvironment: settings.plaidEnvironment,
            plaidClientKey: settings.plaidClientKey
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Get settings (requires GAS OAuth or admin JWT auth)
// Admin JWT gets all fields; GAS clients get Plaid keys but NOT Stripe secret
router.get('/', async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization required' });
    }

    // Check if this is an admin JWT or a GAS OAuth token
    const hasUserEmail = req.header('X-User-Email');

    if (hasUserEmail) {
        // GAS client — validate via Google tokeninfo
        return gasAuth(req as any, res, async () => {
            try {
                let settings = await Settings.findOne();
                if (!settings) {
                    settings = await Settings.create({});
                }
                res.json({
                    plaidClientKey: settings.plaidClientKey,
                    plaidSecretKey: settings.plaidSecretKey,
                    plaidEnvironment: settings.plaidEnvironment,
                    plaidWebhookUrl: settings.plaidWebhookUrl,
                    spreadsheetTemplateUrl: settings.spreadsheetTemplateUrl,
                    appInstruction: settings.appInstruction,
                    appEmail: settings.appEmail,
                    stripePublicKey: settings.stripePublicKey,
                    stripePaymentMode: settings.stripePaymentMode
                    // stripeSecretKey intentionally omitted — checkout sessions created server-side
                });
            } catch (err: any) {
                res.status(500).json({ message: err.message });
            }
        });
    } else {
        // Admin JWT — return all fields
        return auth(req as any, res, async () => {
            try {
                let settings = await Settings.findOne();
                if (!settings) {
                    settings = await Settings.create({});
                }
                res.json(settings);
            } catch (err: any) {
                res.status(500).json({ message: err.message });
            }
        });
    }
});

// Update settings (admin only)
router.post('/', auth, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings(req.body);
        } else {
            // Remove _id and __v from req.body to prevent conflicts
            const { _id, __v, ...updateData } = req.body;
            Object.assign(settings, updateData);
        }
        await settings.save();
        res.json(settings);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
