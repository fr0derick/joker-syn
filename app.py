from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='static')

# Load synergies from the text file
def load_synergies():
    synergies = {}
    with open('corrected_joker_synergies.txt', 'r') as file:
        for line in file:
            joker, connections = line.split(":")
            synergies[joker.strip()] = [c.strip() for c in connections.split(",")]
    return synergies

# Serve the index.html file (your frontend)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve the synergies as JSON via an API
@app.route('/synergies/all', methods=['GET'])
def get_synergies():
    synergies = load_synergies()
    return jsonify(synergies)

if __name__ == '__main__':
    app.run(debug=True)
