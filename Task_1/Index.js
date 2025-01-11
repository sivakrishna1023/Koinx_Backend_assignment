import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

const mongoURI = 'mongodb+srv://sivakrishna:qb4GwFPjiNNJTZ04@cluster0.7fc7lzg.mongodb.net/CoinsBit'; 


const coinSchema = new mongoose.Schema({
    coin_Name: String,
    current_price: Number,
    market_cap: Number,
    market_cap_change_24h: Number,
    timestamp: { type: Date, default: Date.now }
});

const CoinPrice = mongoose.model('CoinsPrice', coinSchema);

const connectionDB=await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.post('/update-coins', async (req, res) => {
    const url = 'https://api.coingecko.com/api/v3/simple/price';
    const params = {
        ids: 'bitcoin,ethereum,matic-network',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
    };

    try {
        const response = await axios.get(url, { params });
        const data = response.data;
        console.log(data);
        // Transform the data to fit the schema
        const coins = Object.keys(data).map(id => ({
            coin_Name: id,
            current_price: data[id].usd,
            market_cap: data[id].usd_market_cap,
            market_cap_change_24h: data[id].usd_24h_change,
            timestamp: new Date() // Adds the current timestamp
        }));
        // console.log(coins);
        // Insert new data
        await CoinPrice.insertMany(coins);

        res.status(200).send('Coin Inserted successfully');
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
        res.status(500).send('Error updating coin data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
