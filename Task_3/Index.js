import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

const mongoURI = 'mongodb+srv://sivakrishna:qb4GwFPjiNNJTZ04@cluster0.7fc7lzg.mongodb.net/CoinsBit'; 

const connectionDB=await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/deviation', async (req, res) => {

    const coin_Name="bitcoin"
    try {
        const records=await mongoose.connection.db.collection('coinsprices').find({ coin_Name })
        .sort({ timestamp: -1 })
        .limit(100)
        .toArray();
        if (records.length === 0) {
            return res.status(404).send('No records found for the specified coin.');
        }
        console.log(records);
        const prices = records.map(record => record.current_price);

        // Calculate mean
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Calculate standard deviation
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const stdDeviation = Math.sqrt(variance);

        res.status(200).json({
            coin_Name,
            standard_deviation: stdDeviation
        });
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
        res.status(500).send('Error updating coin data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
