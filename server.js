const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Blockfrost Mainnet API Key
const API_KEY = 'mainnetuIz49e1AovCj5yshhFkLRE41UD6zVYFG';
const BLOCKFROST_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';

// Endpoint to handle reports
app.post('/report', async (req, res) => {
    const { generatedID, password } = req.body;

    if (!generatedID || !password) {
        return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    try {
        // This example assumes storing metadata only.
        // To really submit a transaction on-chain, you'd use a wallet or CLI.

        const metadata = {
            "safechain": {
                "reportID": generatedID,
                "password": password // Normally you'd hash passwords!
            }
        };

        // Log the metadata (For demonstration purpose)
        console.log("Received Metadata:", metadata);

        // Simulate saving metadata (Real blockchain write needs wallet keys)
        res.json({ success: true, metadata: metadata });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Run the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
