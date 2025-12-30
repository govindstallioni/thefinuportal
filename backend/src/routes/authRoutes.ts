import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

// Register (for initial setup)
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

        const admin = new Admin({ email, password });
        await admin.save();
        res.status(201).json({ message: 'Admin created' });
    } catch (err: any) {
        console.error('Registration error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET || 'fallbacksecret',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email
            }
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
