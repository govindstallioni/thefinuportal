import express from 'express';
import User from '../models/User.js';
import UserSpreadsheet from '../models/UserSpreadsheet.js';

const router = express.Router();

/**
 * @route   POST /api/users/validate-user
 * @desc    Validate user exists, create if not, and sync spreadsheet ID
 */
router.post('/validate-user', async (req, res) => {
    try {
        const { email, spreadsheetId } = req.body;

        if (!email) {
            return res.status(400).json({ status: 'error', message: 'Email is required' });
        }

        let user = await User.findOne({ email });
        let spreadsheetCreated = false;
        let userCreated = false;

        if (!user) {
            // Step 3: Create user record if not exists
            user = new User({ email });
            await user.save();
            userCreated = true;

            // Also create spreadsheet record if spreadsheetId is provided
            if (spreadsheetId) {
                const newSpreadsheet = new UserSpreadsheet({
                    userId: user._id,
                    spreadsheetId: spreadsheetId
                });
                await newSpreadsheet.save();
                spreadsheetCreated = true;
            }
        } else {
            // Step 4: If exists, check spreadsheet_id and create if not exists
            if (spreadsheetId) {
                const existingSpreadsheet = await UserSpreadsheet.findOne({
                    userId: user._id,
                    spreadsheetId: spreadsheetId
                });

                if (!existingSpreadsheet) {
                    const newSpreadsheet = new UserSpreadsheet({
                        userId: user._id,
                        spreadsheetId: spreadsheetId
                    });
                    await newSpreadsheet.save();
                    spreadsheetCreated = true;
                }
            }
        }

        res.json({
            status: 'success',
            message: userCreated
                ? 'User and spreadsheet created successfully'
                : (spreadsheetCreated ? 'Spreadsheet synced successfully' : 'User already exists and spreadsheet is up to date'),
            data: {
                userId: user._id,
                email: user.email,
                isSubscribed: user.isSubscribed,
                userCreated,
                spreadsheetCreated
            }
        });
    } catch (err: any) {
        console.error('User sync error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @route   GET /api/users
 * @desc    Get all users (for admin dashboard)
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
