const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Example: http://localhost:3001/coins/markets?vs_currency=usd&per_page=10&page=1
app.get('/coins/markets', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: req.query,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'CoinGecko proxy error', detail: error.message });
  }
});

// Example: http://localhost:3001/coins/bitcoin
app.get('/coins/:id', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${req.params.id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'CoinGecko proxy error', detail: error.message });
  }
});

// Example: http://localhost:3001/coins/bitcoin/market_chart?vs_currency=usd&days=7
app.get('/coins/:id/market_chart', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${req.params.id}/market_chart`, {
      params: req.query,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Market chart proxy error', detail: error.message });
  }
});

// Example: http://localhost:3001/search/trending
app.get('/search/trending', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/search/trending`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Trending search proxy error', detail: error.message });
  }
});

// Add more endpoints if needed

const PORT = 3001;
app.listen(PORT, () => console.log(`🔁 Proxy running on http://localhost:${PORT}`));
