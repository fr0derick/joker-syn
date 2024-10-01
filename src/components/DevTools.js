import React, { useState, useEffect } from 'react';
import './DevTools.css';  // Import the new CSS file for styling
import config from '../config';

const DevTools = () => {
  const [allJokers, setAllJokers] = useState([]);
  const [selectedJoker, setSelectedJoker] = useState('');
  const [jokerSynergies, setJokerSynergies] = useState([]);
  const [newSynergyJoker, setNewSynergyJoker] = useState('');
  const [apiKey, setApiKey] = useState('');  
  const [apiKeySet, setApiKeySet] = useState(false); 

  // Function to set the API key and confirm
const handleSetApiKey = () => {
  if (apiKey) {
    setApiKeySet(true);
    alert("API key set successfully!");
  } else {
    alert("Please enter a valid API key");
  } 
};

  // Fetch all jokers from the backend
  useEffect(() => {
    if (apiKeySet) {  // Ensure API key is set before making the request
      const loadJokers = async () => {
        const response = await fetch(`${config.API_BASE_URL}/get_all_jokers`);
        const data = await response.json();
        setAllJokers(data);
      };
      loadJokers();
    }
  }, [apiKeySet]);  // Only run if the API key is set

  // Fetch synergies for the selected joker
  useEffect(() => {
    if (selectedJoker && apiKeySet) {  // Ensure API key is set before making the request
      const fetchSynergies = async () => {
        const response = await fetch(`${config.API_BASE_URL}/find_synergies`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-api-key': apiKey  // Include API key in the headers
          },
          body: JSON.stringify({ jokers: [selectedJoker] }),
        });
        const data = await response.json();

        // Check if there are synergies
        if (Object.keys(data).length > 0) {
          setJokerSynergies(Object.keys(data)); 
        } else {
          setJokerSynergies([]);
        }
      };
      fetchSynergies();
    }
  }, [selectedJoker, apiKeySet]);

  // Function to add a two-way synergy between two jokers
  const addSynergy = async () => {
    if (selectedJoker && newSynergyJoker && apiKeySet) {  // Ensure API key is set before making the request
      await fetch(`${config.API_BASE_URL}/add_synergy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey  // Include API key in the headers
        },
        body: JSON.stringify({ joker1: selectedJoker, joker2: newSynergyJoker }),
      });

      await fetch(`${config.API_BASE_URL}/add_synergy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey  // Include API key in the headers
        },
        body: JSON.stringify({ joker1: newSynergyJoker, joker2: selectedJoker }),
      });

      alert(`Synergy added between ${selectedJoker} and ${newSynergyJoker}`);

      // Clear the synergy input and refresh the list
      setNewSynergyJoker('');
      setSelectedJoker(selectedJoker); 
    } else {
      alert("Please set the API key and select both jokers.");
    }
  };

  // Function to remove a two-way synergy between two jokers
  const removeSynergy = async (jokerToRemove) => {
    if (selectedJoker && jokerToRemove && apiKeySet) {  // Ensure API key is set before making the request
      await fetch(`${config.API_BASE_URL}/delete_synergy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey  // Include API key in the headers
        },
        body: JSON.stringify({ joker1: selectedJoker, joker2: jokerToRemove }),
      });

      await fetch(`${config.API_BASE_URL}/delete_synergy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey  // Include API key in the headers
        },
        body: JSON.stringify({ joker1: jokerToRemove, joker2: selectedJoker }),
      });

      alert(`Synergy removed between ${selectedJoker} and ${jokerToRemove}`);

      // Update the UI by removing the synergy locally
      setJokerSynergies(jokerSynergies.filter((j) => j !== jokerToRemove));

      // Refresh synergies
      setSelectedJoker(selectedJoker);
    } else {
      alert("Please set the API key and select both jokers.");
    }
  };

  return (
    <div className="dev-tools-container">
      {/* Header Section */}
      <header className="dev-tools-header">
        <h1>Joker Synergy Management</h1>
        <button onClick={() => window.location.href = '/'}>Back to Main</button>
      </header>

      {/* Input for API Key */}
      <div className="api-key-section">
        <label htmlFor="api-key-input">Enter API Key:</label>
        <input
          id="api-key-input"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}  // Store the entered API key in state
          placeholder="Enter your API key"
        />
        <button onClick={handleSetApiKey}>Set API Key</button>
      </div>

      <div className="dev-tools-content">
        {/* Remove Synergies Section */}
        <section className="remove-synergies-section">
          <h2>Remove Synergies</h2>
          <select
            value={selectedJoker}
            onChange={(e) => setSelectedJoker(e.target.value)}
            className="joker-dropdown"
          >
            <option value="">Select Joker</option>
            {allJokers.map((joker, index) => (
              <option key={index} value={joker}>
                {joker}
              </option>
            ))}
          </select>

          {jokerSynergies.length > 0 ? (
            <div className="synergies-list">
              <h3>Current Synergies for {selectedJoker}:</h3>
              <ul>
                {jokerSynergies.map((synergy, index) => (
                  <li key={index} className="synergy-item">
                    {synergy} 
                    <button className="remove-btn" onClick={() => removeSynergy(synergy)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No synergies for this joker</p>
          )}
        </section>

        {/* Add Synergies Section */}
        <section className="add-synergies-section">
          <h2>Add Synergies</h2>
          <div className="synergy-form">
            <select
              value={selectedJoker}
              onChange={(e) => setSelectedJoker(e.target.value)}
              className="joker-dropdown"
            >
              <option value="">Select Joker</option>
              {allJokers.map((joker, index) => (
                <option key={index} value={joker}>
                  {joker}
                </option>
              ))}
            </select>

            <select
              value={newSynergyJoker}
              onChange={(e) => setNewSynergyJoker(e.target.value)}
              className="joker-dropdown"
            >
              <option value="">Select Joker to Add Synergy</option>
              {allJokers.map((joker, index) => (
                <option key={index} value={joker}>
                  {joker}
                </option>
              ))}
            </select>

            <button className="add-btn" onClick={addSynergy}>
              Add Synergy
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DevTools;
