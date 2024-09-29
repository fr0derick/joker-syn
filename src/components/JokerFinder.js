import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import DraggableJoker from './DraggableJoker'; // Ensure the correct import path for DraggableJoker
import JokerCard from './JokerCard'; // Import the JokerCard component

const JokerFinder = () => {
  const [allJokers, setAllJokers] = useState([]);
  const [jokerInput, setJokerInput] = useState('');
  const [jokerFilter, setJokerFilter] = useState('');
  const [ownedJokers, setOwnedJokers] = useState([]);
  const [synergyData, setSynergyData] = useState({});
  const [nextJokerId, setNextJokerId] = useState(0);
  const [isOverlapping, setIsOverlapping] = useState(false); // New state to manage overlap
  const jokerGridRef = useRef(null); // Reference to the container

  // Fetch all jokers from the backend (TXT file)
  useEffect(() => {
    const loadJokers = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_all_jokers');
        if (!response.ok) {
          throw new Error('Failed to fetch jokers');
        }
        const data = await response.json();
        // Assign unique IDs to all jokers
        const jokersWithIds = data.map((joker, idx) => ({
          name: joker,
          id: `joker-${nextJokerId + idx}`,
        }));
        setAllJokers(jokersWithIds);
        setNextJokerId((prev) => prev + jokersWithIds.length); // Increment the ID counter
      } catch (error) {
        console.error('Error fetching jokers:', error);
      }
    };
    loadJokers();
  }, []); // Run only once on mount

  // Fetch synergies when owned jokers change
  useEffect(() => {
    if (ownedJokers.length > 0) {
      const findSynergies = async () => {
        try {
          const response = await fetch('http://localhost:5000/find_synergies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jokers: ownedJokers.map((joker) => joker.name) }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch synergies');
          }
          const data = await response.json();
          setSynergyData(data);
        } catch (error) {
          console.error('Error fetching synergies:', error);
        }
      };
      findSynergies();
    } else {
      setSynergyData({});
    }
  }, [ownedJokers]);

  // Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(ownedJokers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOwnedJokers(items);
  };

  // Function to remove a joker on click
  const removeJokerFromCollection = (jokerId) => {
    setOwnedJokers(ownedJokers.filter((joker) => joker.id !== jokerId));
  };

  // Dynamic overlap logic
  useEffect(() => {
    const container = jokerGridRef.current;
    if (container) {
      const totalCardWidth = Array.from(container.children).reduce((total, card) => {
        return total + card.offsetWidth;
      }, 0);

      if (totalCardWidth > container.offsetWidth) {
        setIsOverlapping(true);
      } else {
        setIsOverlapping(false);
      }
    }
  }, [ownedJokers]);

  // Sort synergetic jokers by most synergies and alphabetically
  const sortedSynergisticJokers = Object.keys(synergyData)
    .sort((a, b) => {
      const countA = synergyData[a].count;
      const countB = synergyData[b].count;
      if (countA !== countB) {
        return countB - countA; // Sort by synergy count (descending)
      }
      return a.localeCompare(b); // If counts are the same, sort alphabetically
    });

  return (
    <div className="flex h-full bg-gray-100 p-8 min-h-0">
      {/* Left Column: All Jokers */}
      <div className="w-1/2 p-4 border-r-4 border-gray-300 flex flex-col min-h-0">
        <h2 className="text-2xl font-bold mb-4">Your Jokers</h2>

        {/* Drag and drop context */}
        <DragDropContext 
          onDragEnd={handleOnDragEnd}
          dropAnimation={{ duration: 0 }}
        >
          <Droppable droppableId="ownedJokers" direction="horizontal">
            {(provided) => (
              <div
                className={`joker-grid ${isOverlapping ? 'overlap' : ''}`} // Apply overlap class conditionally
                {...provided.droppableProps}
                ref={(el) => {
                  provided.innerRef(el);
                  jokerGridRef.current = el; // Assign the ref
                }}
              >
                {ownedJokers.length > 0 ? (
                  ownedJokers.map((jokerObj, index) => (
                    <DraggableJoker
                      key={jokerObj.id}
                      jokerObj={jokerObj}
                      index={index}
                      removeJokerFromCollection={removeJokerFromCollection}
                    />
                  ))
                ) : (
                  <div className="no-jokers-message">No Jokers</div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
                joker.name.toLowerCase().startsWith(jokerInput.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
              .map((joker) => (
                <div
                  key={joker.id}
                  className="joker-card bg-white p-4 rounded shadow mb-2 cursor-pointer"
                  onClick={() => {
                    const newJoker = {
                      id: `joker-${nextJokerId}`,
                      name: joker.name,
                    };
                    setNextJokerId((prev) => prev + 1);
                    setOwnedJokers([...ownedJokers, newJoker]);
                  }}
                >
                  <JokerCard name={joker.name} /> {/* Use JokerCard to display image or fallback text */}
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
          {sortedSynergisticJokers.length > 0 ? (
            sortedSynergisticJokers
              .filter((joker) =>
                joker.toLowerCase().startsWith(jokerFilter.toLowerCase())
              )
              .map((joker) => {
                // Get the list of jokers it synergizes with in "Your Jokers"
                const synergizedWith = synergyData[joker].synergizedWith.filter((synergyJoker) =>
                  ownedJokers.some((owned) => owned.name === synergyJoker)
                );

                return (
                  <div
                    key={joker} // Assuming joker names are unique
                    className="synergy-card bg-white p-4 rounded shadow mb-2 cursor-pointer"
                    onClick={() =>
                      setOwnedJokers([...ownedJokers, { id: `joker-${nextJokerId}`, name: joker }])
                    }
                  >
                    <JokerCard name={joker} /> {/* Display JokerCard with synergy info */}
                    <div className="synergy-info text-sm text-gray-600">
                      Synergizes with: {synergizedWith.length} ({synergizedWith.join(', ')}) {/* Count and list of synergies */}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="synergetic-jokers-message">Synergetic jokers shown here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JokerFinder;

