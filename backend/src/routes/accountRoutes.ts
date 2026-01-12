import express from 'express';
import Account from '../models/Account.js';
import User from '../models/User.js';

const router = express.Router();

// Get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Create an account
router.post('/', async (req, res) => {
    const account = new Account(req.body);
    try {
        const newAccount = await account.save();
        res.status(201).json(newAccount);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});



// Store Plaid accounts (Public API)
router.post('/store-plaid', async (req, res) => {
    try {
        const { email, plaid_item_id, access_token, accounts, metadata } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!accounts || !Array.isArray(accounts)) {
            return res.status(400).json({ message: 'Accounts array is required' });
        }

        const accountsToSave = accounts.map((acc: any) => {
            // Flexible mapping to handle different Plaid metadata/account structures
            const instId = metadata?.institution_id || metadata?.institution?.institution_id || acc.institution_id;
            const instName = metadata?.institution_name || metadata?.institution?.name || acc.institution_name || req.body.institution_name;
            const accType = acc.type || acc.account_type;
            const accSubtype = acc.subtype || acc.account_subtype;

            const mapped = {
                user_id: user._id,
                account_id: acc.id || acc.account_id,
                access_token: access_token,
                item_id: plaid_item_id,
                institution_id: instId,
                institution_name: instName,
                mask: acc.mask,
                account_name: acc.name,
                account_type: accType,
                account_subtype: accSubtype,
                // Also populate general fields for compatibility
                name: acc.name,
                type: accType,
                // Defaults
                is_linked: false,
                linked_date: null,
                next_cursor: null,
                status: true,
                is_update: false,
                balance: 0,
                color: '#3b82f6'
            };
            return mapped;
        });

        console.log('Final accounts to save:', JSON.stringify(accountsToSave, null, 2));
        const result = await Account.insertMany(accountsToSave);
        console.log('Save result IDs:', result.map(r => r._id));

        res.status(200).json({
            message: 'Accounts stored successfully',
            count: accountsToSave.length,
            userId: user._id
        });
    } catch (err: any) {
        console.error('Error storing plaid accounts:', err);
        // Detailed error logging for mongoose validation errors
        if (err.name === 'ValidationError') {
            console.error('Validation Errors:', err.errors);
        }
        res.status(500).json({ message: err.message, details: err.errors });
    }
});

// Get accounts by user email (Public API)
router.get('/get-by-email/:email', async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const accounts = await Account.find({ user_id: user._id });

        res.status(200).json(accounts);
    } catch (err: any) {
        console.error('Error fetching accounts by email:', err);
        res.status(500).json({ message: err.message });
    }
});

// Update account details by account_id
router.patch('/update-account/:account_id', async (req, res) => {
    try {
        const { account_id } = req.params;
        const updateData = req.body;

        // Prevent updating sensitive official fields if necessary
        delete updateData.account_id;
        delete updateData.account_name;
        delete updateData.user_id;

        const account = await Account.findOneAndUpdate(
            { account_id },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.json(account);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Get account by account_id
router.get('/:account_id', async (req, res) => {
    try {
        const { account_id } = req.params;
        const account = await Account.findOne({ account_id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
