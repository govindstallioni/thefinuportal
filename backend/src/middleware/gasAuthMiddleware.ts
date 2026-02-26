import type { Request, Response, NextFunction } from 'express';

interface GasAuthRequest extends Request {
    gasUser?: {
        email: string;
        verified: boolean;
    };
}

/**
 * Middleware to authenticate requests from Google Apps Script clients.
 * Validates the Google OAuth token by calling Google's tokeninfo endpoint
 * and verifies the X-User-Email header matches the token's email.
 */
export const gasAuth = async (req: GasAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const userEmail = req.header('X-User-Email');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    if (!userEmail) {
        return res.status(401).json({ message: 'Missing X-User-Email header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const response = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(token)}`
        );

        if (!response.ok) {
            return res.status(401).json({ message: 'Invalid or expired OAuth token' });
        }

        const tokenInfo = await response.json() as { email?: string; email_verified?: string };

        if (!tokenInfo.email) {
            return res.status(401).json({ message: 'Token does not contain email information' });
        }

        // Verify the email in the token matches the X-User-Email header
        if (tokenInfo.email.toLowerCase() !== userEmail.toLowerCase()) {
            return res.status(403).json({ message: 'Email mismatch between token and header' });
        }

        req.gasUser = {
            email: tokenInfo.email.toLowerCase(),
            verified: tokenInfo.email_verified === 'true'
        };

        next();
    } catch (err: any) {
        console.error('GAS auth middleware error:', err);
        return res.status(500).json({ message: 'Authentication verification failed' });
    }
};

export type { GasAuthRequest };
