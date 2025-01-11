import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;


app.get('/stats', async (req, res) => {
    const url = 'https://api.coingecko.com/api/v3/coins';
    const id="bitcoin"
    try {
        const response = await axios.get(`${url}/${id}`);
        const data = response.data;
        console.log(data);
        res.status(200).json({
            Message:"Successfully fetched the Data",
            data
        })
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
        res.status(500).send('Error In Fetching the Stats');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
