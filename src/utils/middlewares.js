const API_KEY = process.env.API_KEY;

module.exports = {
    verifyApiKey: (req, res, next) => {
        console.log('Request Headers:', req.headers);
        const apiKey = req.headers['x-api-key'];
        console.log(`Received API key in request: ${apiKey}`);
        if (!apiKey) {
            return res.status(401).json({ message: 'Unauthorized: API key is missing' });
        }
        if (apiKey !== API_KEY) {
            console.log('Invalid API Key');
            return res.status(403).json({ message: 'Forbidden: Invalid API key' });
        }
        next();
    }
};
