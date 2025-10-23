const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Spotify API credentials
const CLIENT_ID = '53f388ccf8e4415facc5f59c874f2d08';
const CLIENT_SECRET = 'dd69ca66a71845b3876502c33a94ed75';
let ACCESS_TOKEN = '';

// Get access token
async function getAccessToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    ACCESS_TOKEN = data.access_token;
    console.log('Access token retrieved');
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { q, type = 'track', limit = 10 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    if (!ACCESS_TOKEN) {
      await getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    if (response.status === 401) {
      await getAccessToken();
      return res.redirect(`/api/search?q=${q}&type=${type}&limit=${limit}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
});

// Get track details
app.get('/api/track/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (!ACCESS_TOKEN) {
      await getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    if (response.status === 401) {
      await getAccessToken();
      return res.redirect(`/api/track/${id}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Track error:', error);
    res.status(500).json({ error: 'Failed to get track' });
  }
});

// Get recommendations
app.get('/api/recommendations', async (req, res) => {
  const { seed_tracks, limit = 10 } = req.query;

  try {
    if (!ACCESS_TOKEN) {
      await getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    if (response.status === 401) {
      await getAccessToken();
      return res.redirect(`/api/recommendations?seed_tracks=${seed_tracks}&limit=${limit}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Initialize access token on startup
getAccessToken();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;