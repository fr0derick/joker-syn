import React, { useState, useEffect } from 'react';

const JokerFinder = () => {
  const [allJokers, setAllJokers] = useState([]); 
  const [jokerInput, setJokerInput] = useState(''); 
  const [jokerFilter, setJokerFilter] = useState(''); 
  const [ownedJokers, setOwnedJokers] = useState([]); 
  const [synergyData, setSynergyData] = useState({}); 

  // Fetch all jokers from the backend (TXT file)
  useEffect(() => {
    const loadJokers = async () => {
      const response = await fetch('http://localhost:5000/get_all_jokers');
      const data = await response.json();
      setAllJokers(data);
    };
    loadJokers();
  }, []);

  // Fetch synergies when owned jokers change
  useEffect(() => {
    if (ownedJokers.length > 0) {
      const findSynergies = async () => {
        const response = await fetch('http://localhost:5000/find_synergies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jokers: ownedJokers }),
        });
        const data = await response.json();
        setSynergyData(data);
      };
      findSynergies();
    } else {
      setSynergyData({});
    }
  }, [ownedJokers]);

  // Add a joker to the user's collection
  const addJokerToCollection = (joker) => {
    if (!ownedJokers.includes(joker)) {
      setOwnedJokers([...ownedJokers, joker]);
    }
  };

  // Remove a joker from the user's collection
  const removeJokerFromCollection = (joker) => {
    setOwnedJokers(ownedJokers.filter((j) => j !== joker));
  };

  return (
    <div className="flex h-full bg-gray-100 p-8 min-h-0">
      {/* Left Column: All Jokers */}
      <div className="w-1/2 p-4 border-r-4 border-gray-300 flex flex-col min-h-0">
        <h2 className="text-2xl font-bold mb-4">Your Jokers</h2>
        <div className="joker-grid overflow-auto">
          {ownedJokers.length > 0 ? (
            ownedJokers.map((joker, index) => (
              <div
                key={index}
                className="joker-card"
                onClick={() => removeJokerFromCollection(joker)}
              >
                {joker}
              </div>
            ))
          ) : (
            <div className="no-jokers-message">No Jokers</div>
          )}
        </div>

        {/* Search for Joker Section */}
        <div className="mt-6 flex flex-col flex-1 min-h-0">
          <h2 className="text-lg font-semibold mb-2">Search for Joker</h2>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Input search"
            value={jokerInput}
            onChange={(e) => setJokerInput(e.target.value)}
          />
          <div className="find-joker-grid mt-4 flex-1 overflow-auto">
            {allJokers
              .filter((joker) =>
                joker.toLowerCase().startsWith(jokerInput.toLowerCase())
              )
              .map((joker, index) => (
                <div
                  key={index}
                  className="joker-card"
                  onClick={() => addJokerToCollection(joker)}
                >
                  {joker}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Right Column: Synergetic Jokers */}
      <div className="w-1/2 p-4 flex flex-col min-h-0">
        <h2 className="text-2xl font-bold mb-4">Synergetic Jokers</h2>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Filter synergizing jokers"
          value={jokerFilter}
          onChange={(e) => setJokerFilter(e.target.value)}
        />
        <div className="synergy-grid flex-1 overflow-auto">
          {Object.keys(synergyData).length > 0 ? (
            Object.keys(synergyData)
              .filter((joker) =>
                joker.toLowerCase().startsWith(jokerFilter.toLowerCase())
              )
              .sort((a, b) => synergyData[b].count - synergyData[a].count)
              .map((joker, index) => (
                <div key={index} className="synergy-card">
                  {joker} [{synergyData[joker].count}]
                  <div className="synergy-info">
                    Synergizes with: {synergyData[joker].synergizedWith.join(', ')}
                  </div>
                </div>
              ))
          ) : (
            <div className="synergetic-jokers-message">
              Synergetic jokers shown here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JokerFinder;
