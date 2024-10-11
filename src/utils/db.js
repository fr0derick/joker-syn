const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite database
const dbPath = path.join(__dirname, 'jokers.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the jokers.db database.');
    }
});

module.exports = {
    // Fetch all jokers
    getAllJokers: (callback) => {
        const sql = 'SELECT DISTINCT joker_name FROM joker_synergies';
        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                const jokers = rows.map(row => row.joker_name);
                callback(null, jokers);
            }
        });
    },

    // Find synergies for a list of jokers
    findSynergies: (jokersInput, callback) => {
        if (!jokersInput.length) {
            return callback(null, {});
        }

        const placeholders = jokersInput.map(() => '?').join(',');
        const sql = `
            SELECT joker_name, synergy_joker
            FROM joker_synergies
            WHERE joker_name IN (${placeholders})
        `;

        db.all(sql, jokersInput, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }

            let synergyResults = {};
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

            callback(null, synergyResults);
        });
    },

    // Add synergy between two jokers
    addSynergy: (joker1, joker2, callback) => {
        const sql = `
            INSERT OR IGNORE INTO joker_synergies (joker_name, synergy_joker)
            VALUES (?, ?)
        `;
        db.run(sql, [joker1, joker2], (err) => {
            callback(err);
        });
    },

    // Remove synergy between two jokers
    deleteSynergy: (joker1, joker2, callback) => {
        const sql = `
            DELETE FROM joker_synergies
            WHERE joker_name = ? AND synergy_joker = ?
        `;
        db.run(sql, [joker1, joker2], (err) => {
            callback(err);
        });
    }
};
