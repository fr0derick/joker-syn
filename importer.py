import sqlite3
import re

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('jokers.db')
c = conn.cursor()

# Create a table for joker synergies if it doesn't exist
c.execute('''
CREATE TABLE IF NOT EXISTS joker_synergies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    joker_name TEXT NOT NULL,
    synergy_joker TEXT NOT NULL
)
''')

# Clear any existing data to avoid duplicates
c.execute('DELETE FROM joker_synergies')

# Load synergies from the text file
with open('corrected_joker_synergies.txt', 'r', encoding='utf-8') as file:
    for line in file:
        match = re.match(r"^(.*): Jokers: (.*)$", line)
        if match:
            joker_name = match.group(1).strip()
            synergies = match.group(2).split(', ')
            
            # Insert synergies into the database, excluding self-synergies
            for synergy_joker in synergies:
                if synergy_joker != joker_name:  # Exclude self-synergies
                    c.execute('INSERT OR IGNORE INTO joker_synergies (joker_name, synergy_joker) VALUES (?, ?)', 
                              (joker_name, synergy_joker))

# Commit the changes and close the database connection
conn.commit()
conn.close()

print("Synergies imported successfully, self-synergies excluded!")
