import React, { useState, useEffect } from 'react';

const JokerFinder = () => {
  const [jokerInput, setJokerInput] = useState('');
  const [jokerFilter, setJokerFilter] = useState('');
  const [synergyData, setSynergyData] = useState({});

  // This will send a POST request to your Flask server
  const findSynergies = async (input) => {
    const jokers = input.split('\n').map(j => j.trim()).filter(Boolean);

    const response = await fetch('http://localhost:5000/find_synergies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jokers }),
    });

    const data = await response.json();
    setSynergyData(data);
  };

  // Sync input directly with the API call
  const handleJokerInputChange = (e) => {
    const value = e.target.value;
    setJokerInput(value); // Update state
    findSynergies(value); // Directly call with the current value
  };

  const handleJokerFilterChange = (e) => {
    setJokerFilter(e.target.value.toLowerCase());
  };

  return (
    <div>
      <h1>Joker Synergies Finder</h1>
      
      <div>
        <label>Enter Jokers (one per line):</label><br />
        <textarea value={jokerInput} onChange={handleJokerInputChange} className="input-box"></textarea>
      </div>
      
      <div>
        <label>Filter Jokers (one per line):</label><br />
        <textarea value={jokerFilter} onChange={handleJokerFilterChange} className="filter-box"></textarea>
      </div>

      <div className="list-container">
        {Object.keys(synergyData)
          .filter(joker => joker.toLowerCase().startsWith(jokerFilter))
          .map(joker => (
            <div key={joker} className="joker-item">
              {joker} [{synergyData[joker].count}]
              <div className="hover-box">
                Synergizes with: {synergyData[joker].synergizedWith.join(', ')}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default JokerFinder;
