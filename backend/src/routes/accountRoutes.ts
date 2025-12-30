import express from 'express';
import Account from '../models/Account.js';

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

export default router;
