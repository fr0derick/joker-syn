from flask import Flask, jsonify, request
import re
from flask_cors import CORS  # This is needed to allow communication between React and Flask

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the synergies data from the file
def load_synergies(synergies_file):
    synergies_dict = {}
    with open(synergies_file, 'r', encoding='utf-8') as file:
        for line in file:
            match = re.match(r"^(.*): Jokers: (.*)$", line)
            if match:
                joker_name = match.group(1).strip()
                synergies = match.group(2).split(', ')
                synergies_dict[joker_name] = synergies
    return synergies_dict

synergies_file = "corrected_joker_synergies.txt"  # This is the file with your joker synergies
synergies_data = load_synergies(synergies_file)  # Load the data

# Flask route to fetch synergies for a specific joker
@app.route('/find_synergies', methods=['POST'])
def find_synergies():
    jokers_input = request.json.get('jokers', [])
    
    synergy_results = {}
    
    # Find all jokers that synergize with the input jokers
    for joker in jokers_input:
        synergies = synergies_data.get(joker, [])
        for synergy in synergies:
            if synergy not in synergy_results:
                synergy_results[synergy] = {'count': 0, 'synergizedWith': []}
            synergy_results[synergy]['count'] += 1
            synergy_results[synergy]['synergizedWith'].append(joker)
    
    return jsonify(synergy_results)

# Route to get all jokers
@app.route('/get_all_jokers', methods=['GET'])
def get_all_jokers():
    all_jokers = list(synergies_data.keys())
    return jsonify(all_jokers)

if __name__ == '__main__':
    app.run(debug=True)
