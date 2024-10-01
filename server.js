// Load environment variables from the .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Retrieve the API key from the .env file
const API_KEY = process.env.API_KEY;
console.log(`Loaded API_KEY from .env: ${API_KEY}`);

// Middleware for API key
function verifyApiKey(req, res, next) {
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

// Init SQL database
const dbPath = path.join(__dirname, 'jokers.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the jokers.db database.');
    }
});

// Route to fetch all jokers from the database (No API key needed)
app.get('/get_all_jokers', (req, res) => {
  db.all('SELECT DISTINCT joker_name FROM joker_synergies', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const jokers = rows.map(row => row.joker_name);
    res.json(jokers);
  });
});

// Route to find synergies for a list of jokers (No API key needed)
app.post('/find_synergies', (req, res) => {
  const jokersInput = req.body.jokers || [];
  let synergyResults = {};

  if (!jokersInput.length) {
    return res.json({});
  }

  const placeholders = jokersInput.map(() => '?').join(',');
  const sql = `
      SELECT joker_name, synergy_joker
      FROM joker_synergies
      WHERE joker_name IN (${placeholders})
  `;

  db.all(sql, jokersInput, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    rows.forEach(row => {
      const jokerName = row.joker_name;
      const synergyJoker = row.synergy_joker;

      if (!synergyResults[synergyJoker]) {
        synergyResults[synergyJoker] = {
          count: 0,
          synergizedWith: []
        };
      }

      synergyResults[synergyJoker].count += 1;
      synergyResults[synergyJoker].synergizedWith.push(jokerName);
    });

    res.json(synergyResults);
  });
});

// Route to add synergy (Requires API key)
app.post('/add_synergy', verifyApiKey, (req, res) => {
  const { joker1, joker2 } = req.body;

  if (!joker1 || !joker2) {
    return res.status(400).json({ error: 'Joker names are required' });
  }

  const sql = `
      INSERT OR IGNORE INTO joker_synergies (joker_name, synergy_joker)
      VALUES (?, ?)
  `;
  db.run(sql, [joker1, joker2], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json({ message: `Synergy added between ${joker1} and ${joker2}` });
  });
});

// Route to delete synergy (Requires API key)
app.post('/delete_synergy', verifyApiKey, (req, res) => {
  const { joker1, joker2 } = req.body;

  if (!joker1 || !joker2) {
    return res.status(400).json({ error: 'Joker names are required' });
  }

  const sql = `
      DELETE FROM joker_synergies
      WHERE joker_name = ? AND synergy_joker = ?
  `;
  db.run(sql, [joker1, joker2], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(200).json({ message: `Synergy removed between ${joker1} and ${joker2}` });
  });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
