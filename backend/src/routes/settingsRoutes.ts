import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

// Get settings
router.get('/', async (req, res) => {
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

// Update settings
router.post('/', async (req, res) => {
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
