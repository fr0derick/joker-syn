import React, { useState, useEffect } from 'react';
import './DevTools.css';  // Import the new CSS file for styling

const DevTools = () => {
  const [allJokers, setAllJokers] = useState([]);
  const [selectedJoker, setSelectedJoker] = useState('');
  const [jokerSynergies, setJokerSynergies] = useState([]);
  const [newSynergyJoker, setNewSynergyJoker] = useState('');

  // Fetch all jokers from the backend
  useEffect(() => {
    const loadJokers = async () => {
      const response = await fetch('http://localhost:5000/get_all_jokers');
      const data = await response.json();
      setAllJokers(data);
    };
    loadJokers();
  }, []);

  // Fetch synergies for the selected joker
  useEffect(() => {
    if (selectedJoker) {
      const fetchSynergies = async () => {
        const response = await fetch('http://localhost:5000/find_synergies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jokers: [selectedJoker] }),
        });
        const data = await response.json();

        // Check if there are synergies
        if (Object.keys(data).length > 0) {
          setJokerSynergies(Object.keys(data));  // Update state with the list of related jokers
        } else {
          setJokerSynergies([]);  // If no synergies found
        }
      };
      fetchSynergies();
    }
  }, [selectedJoker]);

  // Function to add a synergy between two jokers
  const addSynergy = async () => {
    if (selectedJoker && newSynergyJoker) {
      await fetch('http://localhost:5000/add_synergy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ joker1: selectedJoker, joker2: newSynergyJoker }),
      });
      alert(`Synergy added between ${selectedJoker} and ${newSynergyJoker}`);
      setNewSynergyJoker('');  // Reset the field after adding the synergy

      // Re-fetch synergies to keep the UI in sync
      setSelectedJoker(selectedJoker);
    }
  };

  // Function to remove a synergy between two jokers
  const removeSynergy = async (jokerToRemove) => {
    if (selectedJoker && jokerToRemove) {
      await fetch('http://localhost:5000/delete_synergy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ joker1: selectedJoker, joker2: jokerToRemove }),
      });
      alert(`Synergy removed between ${selectedJoker} and ${jokerToRemove}`);

      // Update the UI
      setJokerSynergies(jokerSynergies.filter((j) => j !== jokerToRemove));

      // Re-fetch synergies
      setSelectedJoker(selectedJoker);
    }
  };

  return (
    <div className="dev-tools-container">
      {/* Header Section */}
      <header className="dev-tools-header">
        <h1>Joker Synergy Management</h1>
        <button onClick={() => window.location.href = '/'}>Back to Main</button>
      </header>

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
