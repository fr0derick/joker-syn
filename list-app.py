from flask import Flask, jsonify, request
import sqlite3
import os  # To ensure the correct database path is used
from flask_cors import CORS  # This is needed to allow communication between React and Flask

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Helper function to get a database connection
def get_db_connection():
    db_path = os.path.join(os.getcwd(), 'jokers.db')  # Ensure this path points to your updated database
    print(f"Connecting to database at: {db_path}")  # Debugging statement to confirm the database being used
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # This allows us to return rows as dictionaries
    return conn

# Route to fetch all jokers from the database
@app.route('/get_all_jokers', methods=['GET'])
def get_all_jokers():
    conn = get_db_connection()
    jokers = conn.execute('SELECT DISTINCT joker_name FROM joker_synergies').fetchall()
    conn.close()
    joker_list = [joker['joker_name'] for joker in jokers]
    return jsonify(joker_list)

# Route to find synergies for a list of jokers
@app.route('/find_synergies', methods=['POST'])
def find_synergies():
    jokers_input = request.json.get('jokers', [])
    
    synergy_results = {}
    
    if not jokers_input:
        return jsonify({})
    
    conn = get_db_connection()

    # Fetch synergies from joker_synergies table for each joker
    for joker_name in jokers_input:
        related_jokers = conn.execute('''
            SELECT synergy_joker FROM joker_synergies
            WHERE joker_name = ?
        ''', (joker_name,)).fetchall()

        # Get the related synergies and store them in synergy_results
        related_names = [row['synergy_joker'] for row in related_jokers]
        
        for related_joker in related_names:
            if related_joker not in synergy_results:
                synergy_results[related_joker] = {'count': 0, 'synergizedWith': []}
            synergy_results[related_joker]['count'] += 1
            synergy_results[related_joker]['synergizedWith'].append(joker_name)
    
    conn.close()
    return jsonify(synergy_results)

# Route to add a synergy between two jokers
@app.route('/add_synergy', methods=['POST'])
def add_synergy():
    data = request.json
    joker1_name = data.get('joker1')
    joker2_name = data.get('joker2')

    if not joker1_name or not joker2_name:
        return jsonify({"error": "Joker names are required"}), 400

    conn = get_db_connection()
    
    # Insert synergy into the database
    conn.execute('INSERT OR IGNORE INTO joker_synergies (joker_name, synergy_joker) VALUES (?, ?)', 
                 (joker1_name, joker2_name))
    conn.commit()
    conn.close()

    return jsonify({"message": f"Synergy added between {joker1_name} and {joker2_name}"}), 201

# Route to delete a synergy between two jokers
@app.route('/delete_synergy', methods=['POST'])
def delete_synergy():
    data = request.json
    joker1_name = data.get('joker1')
    joker2_name = data.get('joker2')

    if not joker1_name or not joker2_name:
        return jsonify({"error": "Joker names are required"}), 400

    conn = get_db_connection()

    # Delete the synergy from the database
    conn.execute('DELETE FROM joker_synergies WHERE joker_name = ? AND synergy_joker = ?', 
                 (joker1_name, joker2_name))
    conn.commit()

    conn.close()
    return jsonify({"message": f"Synergy removed between {joker1_name} and {joker2_name}"}), 200

if __name__ == '__main__':
    app.run(debug=True)
